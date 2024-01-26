# Estuary and WFSCollider Interfacing Instruction Sheet

## Pan Parameter

The way Estuary deals with multichannel audio is with the `pan` parameter. Usually, in a stereo configuration, `# pan 0` would correspond to the left channel and `# pan 1` would correspond to the right channel. Something like `# pan rand` would pan the sound to a random position in between the two speakers (between the values 0 and 1).

The system today is set up for 5 "channels" of audio that are then routed into 33 speakers. There are 32 speakers for the Wave Field and 1 speaker dedicated for the lower frequencies. The 5 channels are better thought of as sound objects that we then either send to the low frequency speaker or to the Wave Field. The channels are set up as follows:

```
0 - Low Frequency Channel, 1 speaker
1 - Wave Field Synthesis, 32 speakers, random trajectory sound object
2 - Wave Field Synthesis, 32 speakers, random trajectory sound object
3 - Wave Field Synthesis, 32 speakers, circular trajectory sound object
4 - Wave Field Synthesis, 32 speakers, circular trajectory sound object
```

So to send your code to a particular sound object you would use the # pan parameter and then enclose the desired channel number in parentheses with the total number of channels. i.e. `# pan (3/5)`

So a bass line might be sent to the low frequency channel like this: `slow 4 $ note (scale "minor" "0 2 4 3") # s "flbass" # gain 0.5 # pan (0/5)`

And a textural sound might be sent to one of the random trajectory sound objects like this: `sometimes (fast 2) $ s "pianoext*8?" # pan (2/5) # gain 0.7 # n (irand 6) # speed "-0.25 1"`

You can pattern the pan assignments as follows: `sometimes (fast 2) $ s "pianoext*8?" # pan ("~ ~ 1 4 3 2 ~ ~" / 5) # gain 0.7 # n (irand 6) # speed "-0.25 1"` now each sound will go to a different Wave Field sound object.

## Sending speed commands to WFSCollider

It is now possible to send rudimentary commands from Estuary to control the speed of the Wave Field Synthesis sound objects. There is a helper program running on the WFS computer called superDirtSocket which forwards all messages from Estuary to SuperCollider which is running the WFS software and then SuperCollider runs an `OSCdef` to relay the message to the appropriate command in WFSCollider.

Right now, the parameter set up for control in this way is the `# speed` parameter. In the future, I hope to implement additional parameters for control within Estuary such as specific xy positions of the sound objects and range positions as well.

To change the speed of a sound object we will use the command `speed "0.01" # s "wfs" # n 2`. The speed is the actual speed of the sound in seconds. We need the command `s "wfs"` to tell WFSCollider that this is a message meant for the WFS. Finally, the `n` parameter corresponds to the specific sound object you want to control, so be sure to use the right number.

Again, it is possible to pattern the speed parameter as with any other pattern in MiniTidal: `slow 3 $ speed "0.5 0.01 4" # s "wfs" # n 3`

To be continued...
