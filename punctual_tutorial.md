# Punctual Tutorial
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

rect [0,0][1,1] * purple >> video;
```
## Moving things around
Now that we know a bit about different shapes, how to place them and how to color them.
