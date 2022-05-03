# Punctual Tutorial
Use Punctual either in Estuary https://estuary.mcmaster.ca or in the stand-alone version https://dktr0.github.io/Punctual/ \
The full Punctual Reference page can be found here https://github.com/dktr0/Punctual/blob/main/REFERENCE.md

## Creating objects on screen using coordinates

In Estuary, choose a box and select "Punctual" from the drop down menu, type the following and then press SHIFT-ENTER
```
circle [0,0] 0.5 >> video
```
You should see a white circle (or oval due to the aspect ratio of the screen) in the middle of the screen. If you'd like to see a more exact circle you can use the `fit` function to make the image fit into a square

``` 
fit 1 $ circle [0,0] 0.5 >> video
```
Now using what you know about the coordinate system, place the circle in different parts of the screen (upper left, upper right, bottom left, bottom right)
