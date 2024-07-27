# Estuary and WFSCollider Interfacing Instruction Sheet
### Carl Testa 7/27/2024

## Pan Parameter

The way Estuary deals with multichannel audio is with the `pan` parameter. Usually, in a stereo configuration, `# pan 0` would correspond to the left channel and `# pan 1` would correspond to the right channel. Something like `# pan rand` would pan the sound to a random position in between the two speakers (between the values 0 and 1).

The system today is set up for 10 "channels" of audio that are then routed into 61 speakers. There are 60 speakers for the Wave Field and 1 speaker dedicated for the lower frequencies. The 8 channels are better thought of as sound objects that we then either send to the low frequency speaker or to the Wave Field. The channels are set up as follows:

```
0-1 - Stereo + Low Frequency Channels, 61 speakers, audio routed here is automatically routed to the subwoofer
2-9 - Wave Field Synthesis Sound Objects, 60 speakers
```

So to send your code to a particular sound object you would use the # pan parameter and then enclose the desired channel number in parentheses with the total number of channels. i.e. `# pan (3/10)`

So a bass line might be sent to the low frequency channel like this: `slow 4 $ note (scale "minor" "0 2 4 3") # s "flbass" # gain 0.5 # pan (0/10)`

And a textural sound might be sent to one of the wave field sound objects like this: `sometimes (fast 2) $ s "pianoext*8?" # pan (2/10) # gain 0.7 # n (irand 6) # speed "-0.25 1"`

You can pattern the pan assignments as follows: `sometimes (fast 2) $ s "pianoext*8?" # pan ("~ ~ 1 4 3 2 ~ ~" / 10) # gain 0.7 # n (irand 6) # speed "-0.25 1"` now each sound will go to a different Wave Field sound object.

## Sending OSC commands to WFSCollider

It is now possible to send rudimentary commands from Estuary to control the physical placement of the Wave Field Synthesis sound objects. There is a helper program running on the WFS computer called superDirtSocket which forwards all messages from Estuary to SuperCollider which is running the WFS software and then SuperCollider runs an `OSCdef` to relay the message to the appropriate command in WFSCollider.

In order to control the x,y coordinate of a particular sound object you use the following set of commands (note that we're just using the `gain` parameter as a variable for our coordinate values, we're not actually controlling volume of anything here, we're just repurposing the parameter for our own purposes. We're repurposing the `s` parameter to tell WFSCollider which paramter we want to control, and finally the `n` parameter corresponds to the specific sound object you want to control, so be sure to use the right number.

```
stack[
gain "1" # s "x" n "2",
gain "3" # s "y" n "2"
]
```
That code will move sound object 2 to the coordinate [1,3] on the XY grid of the Wave Field Position Tracker. If you give the pattern multiple x or y coordinates, Estuary will step between one value and the other just like any other pattern in MiniTidal. Since an abrupt jump might cause unwanted pitch changes and zipping sounds, we can smooth the movement using a `lag` command. This will smoothly interpolate the values based on a lag time in seconds. 

So the following code will lag the movement of the sound object by 3 seconds
```
stack[
slow 2 $ gain "-2 2" # s "x" n "2",
slow 2 $ gain "0 4" # s "y" n "2
gain "3" # s "lag" n "2"
]
```
