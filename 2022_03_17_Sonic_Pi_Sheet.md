# Sonic Pi Tutorial
## Basic Commands

### play and sleep
To get started in Sonic Pi you only need to know 2 commands, `play` and `sleep` \
`play 60` will play a synth note specifically middle C on a keyboard \
`play 72` will play the note an octave above middle C or 12 semitones/half-steps higher \
`# this is a comment in Sonic Pi, Sonic Pi will ignore everything on this line if run`

If you type all of those commands into Sonic Pi and hit Run, you'll hear two notes played at the same time, if you want them to happen at different times, you need to use the `sleep` command 
```
play 60
sleep 1
play 72
```
The sleep command tells Sonic Pi to wait a certain number of beats before continuting on to the next command, so the first note is played, Sonic Pi waits for 1 beat (1 second in this case) and then plays the next note 

You could string together a bunch of different `play` and `sleep` commands to play any type of simple melody. If you'd prefer to write out the melody with note names you can use the symbols `:c4` and `:c5` in lieu of `60` and `72`
```
play :c4
sleep 1
play :c5
```

If you get sick of writing a bunch of play and sleep commands you can look in the help section for the `play_pattern` and `play_pattern_timed` commands to save yourself some typing

### use_synth

You might get sick of the default beep sound pretty quick and want to choose different sounds. Sonic Pi has a bunch of synths built-in that you can use. In order to use them, just type `use_synth :` and then a list of different built-in synths will appear. Select one that sounds interesting and try it out!

```
use_synth :piano
play :c4
sleep 1
play :c5 
sleep 1
play :b4
sleep 0.5
play :a4 
sleep 0.5
play :g4
```

Synths have lots of different paremeters or options in order to change the sound. To find these options, click on help, then click on Synths in the bottom left hand menu. Navigate to the synth you want to learn about and you'll see the parameter options there.

To set the different parameters you simply type a comma after your `play` command and enter the name of the parameter plus a colon with the value. So if you wanted to change the release time of a particular note you could write:

```
use_synth :chiplead
play :c4, release: 2
sleep 1
play :c5, release: 4
sleep 1
play :b4
sleep 0.5
play :a4
sleep 0.5
play :g4
```

Explore the available synths and parameters and see what kinds of melodies you can make. If you want to change the tempo, you can use the command `use_bpm` and then a number to change the speed i.e `use_bpm 120`

### Samples

You can use more than synths in Sonic Pi, there is also a huge sample library built-in. The difference between synths and samples is that synths are bits of computer code that generate sound in real-time, whereas samples are generally pre-recorded sounds that can be of anything that the computer plays back.

In Sonic Pi, you can play a sample with the `sample` command. In the same way that writing `use_synth :` brings up a list of synths, writing `sample :` brings up a list of samples to try.
```
sample :drum_bass_hard
sleep 1
sample :drum_snare_hard
sleep 1
```
You can change the pitch of samples using the `rpitch` parameter. The parameter changes notes in semitones/half-steps

```
sample :bass_hit_c, rpitch: 0
sleep 0.25
sample :bass_hit_c, rpitch: 1
sleep 0.25
sample :bass_hit_c, rpitch: 2
sleep 0.25
sample :bass_hit_c, rpitch: 3
sleep 0.25
```

EXTRA CHALLENGE FOR LATER: Can you rewrite the previous bit of code using a function, variable, and X.times do loop?

### Live Coding with the live_loop!

Here's where things start to get really fun. It's great to write melodies and use samples but what if you want the music to keep going and not stop after 1 time? The `live_loop` is the really powerful part of Sonic Pi where you can create multiple loops that serve different instrumental roles and sync them up to play together.

To create a `live_loop` type the following
```
live_loop ::metronome do
sleep 1
end
```
That's it! Once you hit run, that `live_loop` is running but of course it's not making any sound, so add some code in there to make some sound. You can use play, synths, or samples just make sure your code exists in between the `live_loop`'s `do` and `end` commands. You also have to make sure you include a `sleep` command in there because you don't want your live_loop to run infinitely with no waiting. If Sonic Pi wasn't looking out for this and warning you, it would crash your computer. Luckily Sonic Pi has you covered and will make sure your `live_loops` have sleep commands before running them.

### Syncing live_loops

Eventually you'll want to have more than one `live_loop` and want to sync them up, for example a melody and a drum beat. If you type them both in and hit run at the same time, they will start in sync, but what happens in a performance when you want to start a drumbeat and then sync up a melody to it? That is where the `sync` command comes in.
```
use_bpm 120
live_loop :drums do
  sample :drum_bass_hard
  sleep 1
  sample :drum_snare_hard
  sleep 1
end
```
Type that in and set it running, now you're going to type another `live_loop` but this time type a comma after the name of the `live_loop` and then `sync:` a menu of your current `live_loops` will show up. Select the one you want to sync with.
```
live_loop :melody, sync: "/live_loop/drums" do
  use_synth :chiplead
  use_synth_defaults release: 3
  play_pattern_timed [:c4, :c5, :b4, :a4, :g4], [1, 1, 0.5, 0.5, 1]
end
```

There you go! You've synced up your live_loops and now you start and stop them at will. If you want to stop a single `live_loop` without stopping all of them you can type `stop` as the first line in the `live_loop`
```
live_loop :melody, sync: "/live_loop/drums" do
  stop
  use_synth :chiplead
  use_synth_defaults release: 3
  play_pattern_timed [:c4, :c5, :b4, :a4, :g4], [1, 1, 0.5, 0.5, 1]
end
```
Then you can just comment out that line when you want it to start again. Have fun!
