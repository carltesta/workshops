# Locomotion Workshop

These notes were taken during David Ogborn and Kate Sicchio's workshop on LocoMotion during the Ready Avatar One conference in Hamilton, Ontario and Richmond, Virginia

Access LocoMotion here: https://dktr0.github.io/LocoMotion/

Press Shift+Enter to execute the default code and confirm that LocoMotion is working. You should see 4 different dancers performing animations across the screen.

You can also use LocoMotion in the Estuary live coding platform https://estuary.mcmaster.ca if you do, you must place `##locomotion` in the first line of code and make sure you don't select a language type from the drop-down menu in the panel.

## LocoMotion Basics

The most basic program in LocoMotion is 
` dancer `

You can give the dancer parameters to change it's position:
` dancer { x = 1, y = 2, z = 3 } `

You can create multiple dancers by separating each line by a semicolon `;`

```
dancer { x = 1, y = 2, z = 3 };
dancer { x = (-1), y = 2, z = 0 }
```

You can change the dancer model by inputing a new `url`. Find the current models available at the following link: https://github.com/dktr0/LocoMotion/tree/main/models

` dancer { url = "Oak.glb", z = 5, x = 2 } `

Each dancer model has multiple animations associated with it. To change the animation, change the number for the `animation` parameter:

` dancer { url = "Oak.glb", animation = 2, z = 5, x = 2 } `

You can change how long the animation takes by using the `dur` parameter. Now the animation will take place over 2 "cycles"

` dancer { url = "Oak.glb", dur = 2, animation = 2, z = 5, x = 2 } ` 

## Changing Parameters Over Time

You can use oscillators `osc` to change parameters over time:

` dancer {url = "lisa.glb", dur = 3, x = osc 1 ` 

By default and oscillator outputs values between -1 and 1, to change the range of motion you can use the `range` function

` dancer { url = "lisa.glb", dur = 3, x = range (-2) 2 (osc 0.25), y = (-1) } `

## Rotating Dancers

You can rotate the position of a model by using the parameters `rx` `ry` `rz` and giving them a degree value between 0-360

` dancer { url = "lisa.glb", dur = 3, x = range (-2) 2 (osc 0.25), y = (-1), ry = 90 } `

Alternatively, you can direct dancers to "look at" a particular location by using the parameters `lx` `ly` `lz` and giving them coordinates

` dancer { url = "lisa.glb", dur = 3, x = range (-2) 2 (osc 0.25), y = (-1), z = 1, lx = 0, ly = 0, lz = 0 } `

## Creating Planes

To create a plane, for example to create a floor, use the `plane` object. You can use the parameter `sx` `sy` `sz` to change the size in each dimension

` plane { rx = 270, sx = 20 } `

Combine multiple elements with a plane and a dancer:
```
dancer { url = "lisa.glb", dur = 3, x = range (-2) 2 (osc 0.25), y = (-1), z = 1, lx = 0, ly = 0, lz = 0 };
plane { rx = 270, sx = 20, sy = 200, z = 0, y = -2 }
```

You can change the color of objects using hexadecimal color codes. You can find hexadecimal color codes to use on the web at sites like this: https://www.w3schools.com/colors/colors_picker.asp Make sure you prepend each 6 digit color code with `0x` otherwise LocoMotion won't understand

```
dancer { url = "lisa.glb", dur = 3, x = range (-2) 2 (osc 0.25), y = (-1), z = 1, lx = 0, ly = 0, lz = 0 };
plane { rx = 270, sx = 20, sy = 200, z = 0, y = -2, color = 0xaa32ff }
```

## Lighting

There are currently 6 types of lights available in LocoMotion, 3 types are `ambient` `point` and `directional`. Each light can accept an `intensity` parameter to indicate how bright the light is. Point and Directional light can be given a position. A point light emits in all directions whereas directional emits in a specific direction.

```
dancer { url = "lisa.glb", dur = 3, x = range (-2) 2 (osc 0.25), y = (-1), z = 1, lx = 0, ly = 0, lz = 5 };
plane { rx = 270, sx = 20, sy = 200, z = 0, y = -2, color = 0xaa32ff };
ambient {intensity = 0.3 };
point { x = 0, y = 2, z = 0 };
directional { x = 0, y = 0, z = 5, intensity = 1 }
```

You can use the oscillator functions on the lighting parameters as well:

```
dancer { url = "lisa.glb", dur = 3, x = range (-2) 2 (osc 0.25), y = (-1), z = 1, lx = 0, ly = 0, lz = 5 };
plane { rx = 270, sx = 20, sy = 200, z = 0, y = -2, color = 0xaa32ff };
ambient {intensity = 0.1 };
directional { x = 0, y = 0, z = 5, intensity = range 0 1 (osc 1) }
```

## Camera

Finally, you can control the position of the camera by using the `camera` object on a separate line. If you are using LocoMotion in Estuary https://estuary.mcmaster.ca You must place the camera code in the lower right hand corner box in order to it to function. There can be only one camera panel

` camera { x:(-4),y:2,z:10} `

Here is an example of a top-down view:
```
dancer { url = "lisa.glb", dur = 3, x = range (-2) 2 (osc 0.25), y = (-1), z = 1, lx = 0, ly = 0, lz = 5 };
plane { rx = 270, sx = 20, sy = 200, z = 0, y = -2, color = 0xaa32ff };
ambient {intensity = 0.1 };
directional { x = 0, y = 0, z = 5, intensity = range 0 1 (osc 1) };
camera { x:0,y:20,z:0,lx:0,ly:0,lz:0}
```


