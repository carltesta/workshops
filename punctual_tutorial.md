# Punctual Visuals Tutorial
Use Punctual either in Estuary https://estuary.mcmaster.ca or in the stand-alone version https://dktr0.github.io/Punctual/ \
The full Punctual Reference page can be found here https://github.com/dktr0/Punctual/blob/main/REFERENCE.md

## Creating shapes and lines on screen using coordinates
### Circles
In Estuary, choose a box and select "Punctual" from the drop down menu, type the following and then press SHIFT-ENTER
```
circle [0,0] 0.5 >> video
```
You should see a white circle (or oval due to the aspect ratio of the screen) in the middle of the screen. If you'd like to see a more exact circle you can use the `fit` function to make the image fit into a square

``` 
fit 1 $ circle [0,0] 0.5 >> video
```
In a coordinate system [x,y] x values increase from 0 to 1 (and above) from the center to the right and decrease from 0 to -1 from the center to the left. The y values increase from 0 to 1 from the center and upwards and values decrease from 0 to -1 from the center downwards. By combining different x and y values you can place shapes anywhere on the screen. Now using what you know about the coordinate system, place the circle in different parts of the screen (upper left, upper right, bottom left, bottom right).

### Rectangle
Create a rectangle by supplying a center of the rectangle in x,y cooridnates and then the width and height of the rectangle as a pair of values.
```
rect [0,0][1,1] >> video
```
If you want a square again place `fit 1 $` before the rest of your code.

### Lines
We can create horizontal and vertical lines by using `hline` and `vline` and supply a y coordinate for `hline` and a x coordinate for `vline` to display simply lines. The second value is the thickness or width of the line.

```
hline [0.75] 0.001 >> video
```
```
vline [0.25] 0.001 >> video
```
## Colors and Combinations
We've been creating different shapes and lines but they are all one color, white. This is because we've only been sending single channel Punctual code to the video output. We can also send the same code to different outputs to get different colors. Separate each line with a semicolon.
```
circle [0,0] 0.25 >> red;
rect [0.5,0.5][0.5,0.25] >> green;
vline [0.25] 0.02 >> blue;
```
Notice that when the shapes overlap we get combinatorial secondary colors (Red and Blue make Magenta, Red and Green make Yellow, Blue and Green make Cyan)

If you don't want to send individual channels to individual outputs you can also send multichannel signals to the `rgb` output which is functionally the same as the `video` output
```
circle [0,0] 0.25 ++ rect [0.5,0.5] [0.5,0.25] ++ vline [0.25] 0.02 >> rgb
```
Notice that the `++` appends these graphs in a way that preserves the multichannel nature of the combination. So the first channel goes to red, the second to green and the third to blue. If we changed the order of the addition, then the color corresponding to each object would change.
```
rect [0.5,0.5] [0.5,0.25] ++ vline [0.25] 0.02 ++ circle [0,0] 0.25 >> rgb
```
Finally if we used the `+` operator instead of `++` the different channels would be combined into a single white image
```
rect [0.5,0.5] [0.5,0.25] + vline [0.25] 0.02 + circle [0,0] 0.25 >> rgb
```
Alternatively, we can multiply our signals by three different values to generate different shades of color, for example:
```
rect [0,0][1,1] * [0.5,0.1,0.8] >> video
```
We could even assign this list of values to a variable and be able to refer to it over and over.
```
purple << [0.5,0.1,0.8];
forestgreen << [0,(110/255),(51/255)];
rect [0,0][1,1] * forestgreen >> video;
circle [-0.5,0.75] 0.3 * purple >> video;
```
## Moving things around
Now that we know a bit about different shapes, how to place them and how to color them. Let's look at how we can move them around the screen over time. Punctual has a few oscillators we can use to control both both audio and video. The basic oscillators are sine `sin` square `sqr` and triangle `tri`. Each oscillator takes one or more values that controls the frequency of the oscillator or in effect, how fast our shapes and lines move across the screen. Let's start with moving a circle back and forth.
```
fit 1 $ circle [sin 0.1,0] 0.25 >> video; 
```
Now in place of the x value we put a sine wave oscillator with a value of 0.1 hertz. With a 0.1 hertz sine wave it will take 10 seconds for the circle to move from one side of the screen, to the other, and back again. We can use oscillators to control any aspect of our visuals.
```
fit 1 $ circle [sin 0.1,tri 0.5] (sin 0.02) >> video;
```
You may notice in this example that the circle completely disappears for awhile, this is because the radius of the circle is being controlled by a sine wave osillator `sine 0.02` that is moving between negative 1 (-1) and positive 1. So when the circle has a negative radius we don't see it anymore. If we always want to see the circle we can make the sine wave oscillator unipolar (only moving between 0 and 1) but addding the unipolar function `unipolar $`.
```
fit 1 $ circle [sin 0.1, tri 0.5] (unipolar $ sin 0.02) >> video;
```
Now that things are moving around the screen we might want to see their paths gradually fade away. We can do that by increasing the visual feedback present in Punctual with the `fdbk` output.
```
fit 1 $ circle [sin 0.1, tri 0.5] (unipolar $ sin 0.02) >> video;
0.95 >> fdbk;
```
## Audio Reactivity
When using Punctual in the Estuary platform, there are a number of ways to make your visuals audioreactive where they directly (or indirectly) correpsond to aspects of the music including frequency spectrum and tempo. In order to explore this, let's select MiniTidal from the dropdown in another box and copy paste the following code in there and set it running.
```
stack [
fast 2 $ s "drum(3,8),
every 4 (degrade) $ sometimes (fast 2) $ scramble 8 $ note (scale "lydian" "0 .. 7") # s "gtr" # speed "<1 2>",
s "blip*16?"
]
```
Then in the Punctual box, type (or copy/paste) the following code and set it running.
```
fit 1 $ circle [0,0] lo >> red;
fit 1 $ circle [sin cps,0.6] hi >> blue;
hline [(0.85)] (mid/8) >> green;
```
You'll notice the radius of the red circle roughly corresponds to the sounds of the bass drum/low guitar notes, the blue circle is moving left to right in time with the beat and also changing size based on the bigher blip sound, and the horizontal line across the top changing width based on the middle range of the music. Notice that I scaled this value down `(mid/8)` so that it doens't take up as much vertical space on the screen.

Using what you know about Punctual now, modify this sound to create your own audioreactive composition. Have fun!
