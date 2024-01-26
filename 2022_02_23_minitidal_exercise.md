# Estuary/MiniTidal Ambient Music Exercise

## Load Resources
First thing to do is to load the public domain sound resources for this exercise, the leader of the workshop can enter the following command in the Terminal/Chat of the Estuary ensemble. ```!reslist "https://carltesta.github.io/vcsl_for_estuary/resources.json"```

Each participant should choose a sound or two from the following resource list: `concertharp folkharp grandpiano vibraphone pianoext` 

Participants code should like this `s "concertharp"` or `s "grandpiano pianoext"`

Once everyone has entered their code and executed it, they can start to add `slow` commands to the front of what they have written with a number between 2 and 6, for example: `slow 3 $ s "concertharp"` and `slow 4 $ s "grandpiano pianoext"` this tells MiniTidal to slow down the pattern by 3 or 4 times respectively in the code examples.

Each participant can then add rests into their pattern with the tilde symbol `~`. Add a number of different rests in between the sounds, participants can also add additional sounds at this point if they would like. So for example, one participant might write ```s "~ grandpiano ~ ~ folkharp ~"``` and another might write ```s "vibraphone ~ concertharp folkharp ~ ~ ~ ~"```



Change the `# speed` 
reverse speeds `speed "-1 -2 -0.5"`
random choose of speeds `speed "[0.5 | 1 | 2]"`

Change the specific samples being played within the banks with the `n` parameter. Each sample sample bank has a number of different samples. 

Increase the density, change slow 2-6 to slow 0.5 to 1

add a new parameter `# cutoff 1000`

Gradually lower cutoff from 1000 to 0 to fade out

Then add `# silence` at the end to finish
