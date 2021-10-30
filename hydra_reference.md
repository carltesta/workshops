## Hydra Reference (mostly taken from https://ojack.xyz/hydra-functions)

### sources
`noise(scale, offset)`\
`voronoi(scale, speed, blending)`\
`osc(frequency, sync, offset)`\
`shape(numSides, radius, smoothing)`\
`gradient(speed)`\
`solid(red, green, blue, alpha)`

### geometry

`rotate(angle, speed)`\
`scale(amount, xMult, yMult, offsetX, offsetY)`\
`pixelate(pixelX, pixelY)`\
`repeat(repeatX, repeatY, offsetX, offsetY)`\
`repeatX(repeats, offset)`\
`repeatY(repeats, offset)`\
`kaleid(numSides)`\
`scrollX(scrollX, speed)`\
`scrollY(scrollY, speed)`

### color

`posterize(bins, gamma)`\
`shift(red, green, blue, alpha)`\
`invert(amount)`\
`brightness(amount)`\
`luma(threshold, tolerance)`\
`thresh(threshold, tolerance)`\
`color(red, green, blue, alpha)`\
`saturate(amount)`\
`hue(hue)`\
`colorama(amount)`

### blend

`add(color, amount)`\
`layer(color)`\
`blend(color, amount)`\
`mult(color, amount)`\
`diff(color)`\
`mask(color)`

### modulate

`modulate(color, amount)`


