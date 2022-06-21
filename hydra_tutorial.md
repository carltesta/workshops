# Hydra Video Synth Tutorial
## You can go through this tutorial within Hydra by clicking [https://tiny.cc/hydratutorial] (on this link)

//This is Hydra Video Synth, written by Olivia Jack @ojack. You can create amazing live coded visuals with this open-source tool. Some of the artists tonight are using this tool for their performance. Please note that if you are sensitive to seizures due to bright flashing lights you should not use this tool.

//Place your cursor on the line below and then press CTRL+ENTER, by doing that you are "executing" the code
```
osc(60).out()
```

//You should see black and white bars moving across the screen. This is a visual oscillator. It takes 3 parameters (or arguments): frequency, sync, offset which roughly correspond to the number of bars on the screen, how fast the bars are moving, and what colors the bars are showing. Execute the code below (by pressing CTRL+ENTER) and change the numbers to see how the parameters effect the oscillator.

```
osc(60,0.1,1.5).out()
```

//The oscillator is a type of source in Hydra. There are lots of sources. Try out the following lines one at a time
```
noise(10,0.1).out()
```
```
voronoi(10,0.1,0.1).out()
```
```
gradient(2).out()
```
```
shape(3,0.25,0.01).out()
```

//We can use each of those source types to generate visuals. When experimenting with the code, make sure you end each line with .out() otherwise you won't see the results of your code. We can combine different sources in different ways.

//Adding
osc().add(noise()).out()
//Subtracting
noise().diff(gradient()).out()
//Multiplying
voronoi().mult(shape(5,0.75,0.01)).out()
//Blending
gradient().blend(noise(),0.5).out()

//Experiment with adding, subtracting, multiplying, and blending different sources together

gradient(1).mult(shape(3,0.4,0.01)).out()

//You can manipulate the geometry of the sources with the following commands: rotate, pixelate, repeat, kaleid
shape(6,0.4).rotate(0.1,0.5).out()
noise().pixelate(20,20).out()
osc(5,0.1,1.5).rotate(0.1,1).mult(shape(100,0.4).repeat(5,5)).out()
osc(10).mult(osc(10,0.1,1.5)).kaleid(5).out()
shape(3).scrollX(1,0.1).scrollY(1,0.2).out()

//One part of Hydra that is really fun is modulating sources with each other to really distort the shape of your visuals. Modulation basically uses the different colors of a source to move pixels up and down based on the color of a pixel. Modulation functions always take at least two parameters: a source and a number corresponding to the amount of modulation. Execute each line below one by one to see how the increased modulation effects the visuals
shape(3,0.25).modulate(osc(10,0.1,1.5),0.1).out()
shape(3,0.25).modulate(osc(10,0.1,1.5),0.3).out()
shape(3,0.25).modulate(osc(10,0.1,1.5),0.7).out()
shape(3,0.25).modulate(osc(10,0.1,1.5),0.9).out()

//There are other modulate functions for specific geometry changes
osc().modulateRotate(osc(10,0.1,1.5),0.5).out()
osc().modulateKaleid(osc(10,0.1,1.5),0.5).out()
osc().modulatePixelate(osc(10,0.1,1.5),0.5).out()
osc().modulateScale(osc(10,0.1,1.5),0.5).out()

//Hydra also really excels with feedback (sending a signal back into itself). We do this by outputting to a specific buffer in Hydra and then sending it back in as a source using the src() function
noise().modulate(src(o0),0.9).out(o0)
osc(10,0.1,1.5).mult(shape(3,0.25,0.5).rotate(1,0.1)).modulate(src(o0),0.9).out(o0)

//Experiment with creating combinations of sources and functions with different levels of modulation. Have fun! There is so much to explore
voronoi().color(1,0,1).diff(osc(10,0.1,1.5)).modulateRotate(osc(10,0.1,1.5),0.9).out()

//Learn more about the various functions at https://ojack.xyz/hydra-functions

//Clear The Screen
solid().out()

//Tutorial by Carl Testa @carltesta 2022
