# Estuary/MiniTidal Ambient Music Exercise

## Load Resources
First thing to do is to load the public domain sound resources for this exercise, the leader of the workshop can enter the following command in the Terminal/Chat of the Estuary ensemble. ```!reslist "https://carltesta.github.io/vcsl_for_estuary/resources.json"```

## Choose Sounds
Each participant should choose a sound or two from the following resource list: `concertharp folkharp grandpiano vibraphone pianoext` 

Participants code should like this `s "concertharp"` or `s "grandpiano pianoext"`

## Vary the timing of each pattern

Once everyone has entered their code and executed it, they can start to add `slow` commands to the front of what they have written with a number between 2 and 6, for example: `slow 3 $ s "concertharp"` and `slow 4 $ s "grandpiano pianoext"` this tells MiniTidal to slow down the pattern by 3 or 4 times respectively in the code examples.

Each participant can then add rests into their pattern with the tilde symbol `~`. Add a number of different rests in between the sounds, participants can also add additional sounds at this point if they would like. So for example, one participant might write ```slow 3 $ s "~ grandpiano ~ ~ folkharp ~"``` and another might write ```slow 4 $ s "vibraphone ~ concertharp folkharp ~ ~ ~ ~"```

## Change the playback speed 

Participants can now change the speed at which the samples are played by using the `# speed` parameter. `# speed 1` is normal speed. Change the 1 to a 2 for twice as fast and change it to 0.5 to make it half speed. This will also change the pitch of the sample. You can also use negative numbers to make the sample play backwards.

`slow 4 $ s "vibraphone ~ concertharp folkharp ~ ~ ~ ~" # speed "0.5 ~ 1 2 -1"` 

You can also have the pattern choose a random speed from a list like this: `slow 4 $ s "vibraphone ~ concertharp folkharp ~ ~ ~ ~" # speed "[0.5 | 1 | 2 | -1 | -0.5]"`

## Select different samples within each bank

Change the specific samples being played within the banks with the `n` parameter. Each sample sample bank has a number of different samples. For example: `slow 4 $ s "vibraphone ~ concertharp folkharp ~ ~ ~ ~" # speed "[0.5 | 1 | 2 | -1 | -0.5]" # n "8 ~ 3 ~ 9"` If a samples receives a number that is larger than it's sample bank it will just wrap around. So we can change the previous code to this to get the most variety: `slow 4 $ s "vibraphone ~ concertharp folkharp ~ ~ ~ ~" # speed "[0.5 | 1 | 2 | -1 | -0.5]" # n (irand 42)`

The number of samples in each bank for reference is as follows:
```
grandpiano - 42 samples
concertharp - 4 samples
folk harp - 10 samples
vibraphone - 9 samples
pianoext - 6 samples
```

## Increase density of sound

Now let's finally gradually increase the density of sound by changing slow 2-6 to something between 0.5 and 1. For example: `slow 0.7 $ s "vibraphone ~ concertharp folkharp ~ ~ ~ ~" # speed "[0.5 | 1 | 2 | -1 | -0.5]" # n (irand 42)`

## Add Filter cutoff

Let's add a new parameter `# cutoff 1000` to our code: `slow 0.7 $ s "vibraphone ~ concertharp folkharp ~ ~ ~ ~" # speed "[0.5 | 1 | 2 | -1 | -0.5]" # n (irand 42) # cutoff 1000`

Now let's gradually lower cutoff from 1000 to 0 to fade out our sounds: `slow 0.7 $ s "vibraphone ~ concertharp folkharp ~ ~ ~ ~" # speed "[0.5 | 1 | 2 | -1 | -0.5]" # n (irand 42) # cutoff 900`

## Silence to end

Then add `# silence` at the end to finish: `slow 0.7 $ s "vibraphone ~ concertharp folkharp ~ ~ ~ ~" # speed "[0.5 | 1 | 2 | -1 | -0.5]" # n (irand 42) # cutoff 0 # silence`
