## MiniTidal Reference

### playing sounds (samples)

`sound "bd"` play bass drum sample\
`s "bd"` same as above but shorter to write\
`s "sd"` play snare drum sample\
`s "bd sd"` play bass drum and then snare drum divided evenly within the cycle\
`s "bd [sd sd]"` divide the cycle into two groups, in first group plays bass drum, in second group two snare drums\
`s "bd [sd*2]"` same as above\
`s "bd*4"` play four bass drum hits in the cycle "four on the floor"\
`s "bd(4,8)"` same as above, basically spread 4 hits over 8 beats in the cycle\
`s "bd/2 sd/3"` play bass drum sample every 2 cycles, snare drum every 3 cycles\
`s "bd sd ~ sd"` play bass drum, snare drum, rest, snare drum\
`s "drum"` play drum sample\
`s "drum:0 drum:1 drum:2 drum:3"` play drum sample with first index, then second, then third, etc \
`s "drum*4" # n "0 1 2 3"` same as above\
`slow 2 $ s "bd sd bd sd"` or `fast 2 $ s "bd sd bd sd"` play pattern slower or faster than one cycle

### List of Samples to try
spreadsheet of sound banks is [here](https://docs.google.com/spreadsheets/d/1aiKqsljYSy5kOY1Gn1CHfkYAEShDaj-z9TDNqnNcTqU/edit#gid=1498343341)

#### drums
`bd sd hh ho hc lt ht mt drum`
#### melodic (all start on note C)
`gtr arpy sprvibe sid:3 blip acordeon piano casio moog:1 moog:2 pluck:5 sax:5 v`
#### textural
`print birds pebbles psr`
#### speech
`numbers alphabet speech`

### Additional Functions and Syntax
`s "drum*16?" # n (irand 6)` play 16th note drum samples irand chooses random integers, ? plays a note 50% of the time (see [degrade](https://tidalcycles.org/docs/reference/alteration/#degrade))\
`s "arpy*16?" # pan (rand) # note "0 3/2 5/3 7/4 10/5"` play notes 0=C, 3=Eb with random panning and some notes on certain cycles

There are different ways of inputing notes\
`note "0 2/2 4/3 7/4 9/5 11/6" # s "gtr"`\
same as above\
`note "c d/2 e/3 g/4 a/5 b/6" # s "gtr"`

You can stack multiple patterns together\
`stack [
note "0 2/7 4/6 6/5 7/4 9/5 11/6" # s "gtr",
s "[bd sd]*2",
s "hh*16?"
]`

#### Using Scales
`note (scale "harmonicMinor" "0 1 2 3 4 5 6 7") # s "gtr"`\
`note (scale "bartok" "0 1 2 3 4 5 6 7") # s "gtr"`\
`note (scale "major" "0 1 2 3 4 5 6 7") # s "gtr"`

Available Scales\
`minPent majPent ritusen egyptian kumai hirajoshi iwato chinese indian pelog prometheus scriabin gong shang jiao zhi yu whole augmented augmented2 hexMajor7 hexDorian hexPhrygian hexSus hexMajor6 hexAeolian major ionian dorian phrygian lydian mixolydian aeolian minor locrian harmonicMinor harmonicMajor melodicMinor melodicMinorDesc melodicMajor bartok hindu todi purvi marva bhairav ahirbhairav superLocrian romanianMinor hungarianMinor neapolitanMinor enigmatic spanish leadingWhole lydianMinor neapolitanMajor locrianMajor diminished diminished2 chromatic`

Shuffle Notes\
`slow 2 $ shuffle 8 $ note (scale "minor" "~ 8 3 5 7 2 3 4") # s "gtr"`

Effects\
You can use a negative speed to play the sound in reverse\
`slow 4 $ s "birds" # speed "-0.25" # delay "1" # delaytime "0.05"`

Additional Functions\
`iter 4 $ sound "bd cp sd hh"`\
`every 3 (fast 2) $ sound "bd sd bd sd"`\
`every 2 (hurry 2) $ sound "bd sd bd sd"`\
`every 2 (rev) $ note "0 3 7 10" # sound "gtr"`

Chords\
`slow 2 $ note "c'maj7 f'maj7" # s "gtr"`

Available Chords\
`major maj aug plus sharp5 six 6 sixNine six9 sixby9 6by9 major7 maj7 major9 maj9 add9 major11 maj11 add11 major13 maj13 add13 dom7 dom9 dom11 dom13 sevenFlat5 7f5 sevenSharp5 7s5 sevenFlat9 7f9 nine eleven 11 thirteen 13 minor min diminish ed dim minorSharp5 msharp5 mS5 minor6 min6 m6 minorSixNine minor69 min69 minSixNine m69 mSixNine m6by9 minor7flat5 min7f lat5 m7flat5 m7f5 minor7 min7 m7 minor7sharp5 min7sharp5 m7sharp5 m7s5 minor7flat9 min7flat9 m7flat9 m7f9 minor7sharp9 m in7sharp9 m7sharp9 m7s9 diminished7 dim7 minor9 min9 m9 minor11 min11 m11 minor13 min13 m13 one 1 five 5 sus2 sus4 seven Sus2 7sus2 sevenSus4 7sus4 nineSus4 ninesus4 9sus4 sevenFlat10 7f10 nineSharp5 9s5 m9sharp5 m9s5 sevenSharp5flat9 7s5f9 m7sharp5flat9 elevenSharp 11s m11sharp m11s`

Arpeggiate Chords\ 
`note (arp "updown" "<a'min7 e'dom7>") # s "gtr"`

arpeggisation modes in Estuary\
`up down updown downup converge diverge disconverge pinkyup pinkyupdown thumbup thumbupdown`

### Terminal Commands in Estuary
`!listviews` list all available presetiews\
`!presetview twobyfive` change presetview to a two by five grid\
`!publishview def` publish your current view as the default for all users\
`!setbpm 90` change the default BPM of the ensemble

Parts of code taken from: https://club.tidalcycles.org/t/week-3-lesson-1-exploring-the-every-function-including-tackling-the-meaning-of/502
