// =====================================================================================
//  strudel-exolang.js — lets Estuary run Strudel code (https://strudel.cc)
// =====================================================================================
//
//  SETUP (in the Estuary terminal):
//      !exolang "strudel" "https://<your-host>/strudel-exolang.js"
//  Then start any text zone with the line  ##strudel  and write Strudel below it.
//
//  This file is only the "glue". Strudel itself lives in strudel-bundle.js, which must
//  be hosted in the same folder as this file.
//
//  THE BIG PICTURE
//  Estuary calls a handful of functions on the object we hand it:
//      define()   -> user evaluated code in a zone: turn it into a Strudel pattern
//      render()   -> "what notes start between time A and time B?" (called constantly)
//      setTempo() -> the ensemble tempo changed
//      clear()    -> zone was emptied/deleted: stop it
//  Estuary then plays whatever notes render() returns through WebDirt, using the
//  ensemble's samples, so Strudel stays in time with every other language.
// =====================================================================================

import { core, mini, tonal, transpiler } from './strudel-bundle.js';
const { Pattern, silence, stack, isPattern, evalScope, evaluate, noteToMidi } = core;

// Estuary looks for an export named exactly "exoLang" and calls it once.
export function exoLang() {
  return new StrudelExoLang();
}

class StrudelExoLang {
  constructor() {
    this.zones = new Map(); // zone number -> that zone's current Strudel pattern
    this.tempo = { cps: 0.5, time: Date.now() / 1000, cycle: 0 }; // replaced by setTempo()
    this.queue = Promise.resolve(); // runs define() calls one at a time
    this.blocks = null; // collects "$:" blocks while one zone's code is evaluating
    this.ready = this.setupStrudel();
  }

  // ---------------------------------------------------------------------------------
  //  One-time setup: make Strudel's functions (s, n, note, stack, fast...) visible to
  //  user code, and override a few that don't make sense inside Estuary.
  // ---------------------------------------------------------------------------------
  async setupStrudel() {
    const notInEstuary = (hint) => () => { throw new Error(`Not available in Estuary: ${hint}`); };
    const tempoHint = 'set tempo in the terminal, e.g. !setcps 0.5 or !setbpm 120';

    await evalScope(core, mini, tonal, {
      setcps: notInEstuary(tempoHint), setCps: notInEstuary(tempoHint),  // tempo is shared
      setcpm: notInEstuary(tempoHint), setCpm: notInEstuary(tempoHint),  // by the ensemble
      samples: notInEstuary('load samples in the terminal with !reslist "<url>"'),
      hush: () => { if (this.blocks) this.blocks.list = []; return silence; },
      all:  (fn) => { this.blocks?.all.push(fn); return silence; },  // all(x => x.fast(2))
      each: (fn) => { if (this.blocks) this.blocks.each = fn; return silence; },
    });

    // Strudel rewrites   $: s("bd")   into   s("bd").p('$')
    // so .p() is how we catch each block. Names starting/ending with "_" are muted.
    const self = this;
    Pattern.prototype.p = function (name) {
      name = String(name);
      if (name.startsWith('_') || name.endsWith('_')) return silence;
      self.blocks?.list.push({ name, pattern: this });
      return this;
    };
    Pattern.prototype.q = () => silence; // Tidal-style "quiet" alias
  }

  // ---------------------------------------------------------------------------------
  //  define({zone, text}) — evaluate a zone's code.
  //  Return normally = success. Throw = Estuary shows the error message in the zone.
  // ---------------------------------------------------------------------------------
  define({ zone, text }) {
    const job = this.queue.then(() => this.evaluateZone(zone, text));
    this.queue = job.catch(() => {}); // a failed define must not block the next one
    return job;
  }

  async evaluateZone(zone, text) {
    await this.ready;
    const code = (text || '').trim();
    if (!code) { this.zones.delete(zone); return { info: '' }; }

    // Evaluate, collecting any $: blocks / all() / each() along the way.
    const blocks = (this.blocks = { list: [], all: [], each: null });
    let pattern;
    try { pattern = (await evaluate(code, transpiler)).pattern; }
    finally { this.blocks = null; }

    // If the code used $: blocks, play them all together (or only the S$: soloed ones).
    if (blocks.list.length) {
      const soloed = blocks.list.filter((b) => b.name.length > 1 && b.name.startsWith('S'));
      let pats = (soloed.length ? soloed : blocks.list).map((b) => b.pattern);
      if (blocks.each) pats = pats.map(blocks.each);
      pattern = stack(...pats);
    } else if (blocks.each && isPattern(pattern)) {
      pattern = blocks.each(pattern);
    }
    for (const fn of blocks.all) pattern = fn(pattern);

    if (!isPattern(pattern)) throw new Error('This code did not produce a Strudel pattern.');
    this.zones.set(zone, pattern);
    return { info: '' };
  }

  clear({ zone }) {
    this.zones.delete(zone);
  }

  // ---------------------------------------------------------------------------------
  //  setTempo(t) — Estuary describes tempo as "cycle number `count` happened at clock
  //  time `time`, and we move at `freq` cycles per second". Numbers arrive as BigInt
  //  fractions (numerator/denominator), so we turn them into ordinary numbers.
  // ---------------------------------------------------------------------------------
  setTempo(t) {
    this.tempo = {
      cps: Number(t.freqNumerator) / Number(t.freqDenominator),
      cycle: Number(t.countNumerator) / Number(t.countDenominator),
      time: t.time,
    };
  }

  // ---------------------------------------------------------------------------------
  //  render({zone, windowStartTime, windowEndTime}) — called many times per second.
  //  Times are clock seconds (POSIX). We convert them to cycles, ask the pattern for
  //  the notes in that span, and return the ones that START inside it, each stamped
  //  with the exact clock time it should sound.
  // ---------------------------------------------------------------------------------
  render({ zone, windowStartTime: t0, windowEndTime: t1 }) {
    const pattern = this.zones.get(zone);
    const { cps, cycle, time } = this.tempo;
    if (!pattern || !(t1 > t0) || !(cps > 0)) return [];

    const toCycle = (t) => cycle + (t - time) * cps; // clock seconds -> cycles
    const toTime = (c) => time + (c - cycle) / cps;  // cycles -> clock seconds
    const [c0, c1] = [toCycle(t0), toCycle(t1)];

    let haps; // "haps" = Strudel's word for events
    try { haps = pattern.queryArc(c0, c1); }
    catch (e) { console.warn('strudel-exolang:', e); return []; }

    const notes = [];
    for (const hap of haps) {
      if (!hap.hasOnset()) continue; // skip tails of notes that began earlier
      const start = hap.whole.begin.valueOf();
      if (start < c0 || start >= c1) continue; // belongs to a neighbouring window
      const note = toWebDirt(hap.value);
      if (!note) continue;
      note.whenPosix = toTime(start); // when to play it
      note.cps = cps;
      note.delta = hap.duration.valueOf() / cps; // length in seconds (used by SuperDirt)
      notes.push(note);
    }
    return notes;
  }
}

// =====================================================================================
//  toWebDirt(value) — translate one Strudel event, e.g. { s: "bd", n: 2, gain: .8 },
//  into the parameter names WebDirt understands. Returns null if there is no sample.
// =====================================================================================

// Parameters with identical meaning in Strudel and WebDirt/SuperDirt: copied as-is.
const SAME_NAME = `speed begin end pan shape cutoff hcutoff bandf bandq vowel delay delaytime
  delayfeedback loop crush coarse accelerate cut unit nudge room size orbit legato`.split(/\s+/);

function toWebDirt(v) {
  if (typeof v === 'string') v = { s: v };       // "bd sd" on its own = sample names
  if (!v || typeof v !== 'object' || v.s == null) return null; // no sample, nothing to play

  const out = { s: v.bank ? `${v.bank}_${v.s}` : String(v.s) }; // .bank("X") -> "X_bd"
  out.n = v.note == null ? Math.max(0, Math.floor(Number(v.n)) || 0) : 0; // sample number
  for (const k of SAME_NAME) if (v[k] != null) out[k] = v[k];

  if (v.gain != null || v.velocity != null) out.gain = (v.gain ?? 1) * (v.velocity ?? 1);

  // Pitch. Strudel plays a sample at its natural pitch on C3 (MIDI 36); WebDirt's
  // "note" means "shift by this many semitones". So the shift is (midi - 36).
  const midi = toMidi(v);
  if (midi != null) out.note = midi - 36;

  // Filter resonance: Strudel uses Q (about 0-50), WebDirt expects 0-1.
  const to01 = (q) => Math.min(1, Math.max(0, Number(q) / 50 || 0));
  if (v.resonance != null) out.resonance = to01(v.resonance);
  if (v.hresonance != null) out.hresonance = to01(v.hresonance);

  return out;
}

// note("c3") or note(48) or freq(440) -> MIDI number (or null if none given)
function toMidi(v) {
  if (typeof v.note === 'number') return v.note;
  if (v.note != null) { try { return noteToMidi(String(v.note)); } catch { return null; } }
  if (v.freq != null) return 69 + 12 * Math.log2(v.freq / 440);
  return null;
}
