# Turtle

Turtle and L-Systems library

## L-Systems

The `LSystem` class is an implementation of the
[Lindenmayer systems](https://en.wikipedia.org/wiki/L-system) based on an
alphabet of symbols and production rules.

```js
const lsystem = new LSystem(axiom, rules);
```

The `axiom` is the base sentence from which future sentences will be generated
or inferred, and must be composed only by symbols of a defined alphabet. This
alphabet is based on the Turtle Graphics movements.

`F, G, L, M, D, U, +, -, [, ]`

The `rules` is an array of strings or instances of the `Rule` class, where each
one of them defines a **production rule** for spawning the next generation
sentence.

### Generation

The `generate` method in the `LSystem` class spawns new generations of the
current sentence.

```js
const axiom = 'F';
const rules = [
    'F=>F[+F][-G]'
];
const lsystem = new LSystem(axiom, rules);
console.log(lsystem.sentence); // F
lsystem.generate();
console.log(lsystem.sentence); // F[+F][-G]
```

This method also admits a number argument that indicates the number of
generations to generate.

```js
const axiom = 'F';
const rules = [
    'F=>FG'
];
const lsystem = new LSystem(axiom, rules);
console.log(lsystem.sentence); // F
lsystem.generate(4);
console.log(lsystem.sentence); // FGGGG
```

### Rules

The `Rule` class represents a production rule that allows the generation from a
symbol to a string of one or more symbols from the alphabet.

```js
const str = 'F => F[+F][-F]';
const rules = [ new Rule(str) ];
console.log(rule.base); // F
console.log(rule.next); // ['F', '[', '+', 'F', ']', '[', '-', 'F', ']']
```

The `LSystem` class uses this class to maintain and generate the sentences.

## Turtle Graphics

The `Turtle` class is a clumsy attempt to use a "sentence" driven drawing engine
based on the [turtle graphics](https://en.wikipedia.org/wiki/Turtle_graphics).
The sentences use the same symbols in the `LSystem` and `Rule` alphabet, with
each symbol having a specific usage.

Symbol  | Action
--------| ------
`F`, `G`| Advances forward a certain amount of steps drawing a line
`M`     | Advances forward a certain amount of steps without drawing a line
`L`     | Draws a tree leaf
`U`     | Upscale drawing (divides current scale by scale ratio, with initial scale is `1`)
`D`     | Downscale drawing (multiplies current scale by scale ratio, with initial scale is `1`)
`+`     | Turn right a certain angle
`-`     | Turn left a certain angle
`[`     | Saves current context
`]`     | Restores current context

The `render` method reads each symbol in the string, and performs an action
according to the previous table.

```js
const turtle = new Turtle(config);
turtle.render(sentence);
```

### Turtle Config

The `config` argument for the `Turtle` class constructor has these properties:

Property     | Type                       | Description
-------------|----------------------------|------------
context      | `CanvasRenderingContext2D` | Canvas rendering context used for drawing
strokeSize   | `number`                   | Lenght of each step used stroke or move (may be affected by scaling)
strokeWeight | `number`                   | Width of the stroke (may be affected by scaling)
angle        | `number`                   | Angle used for each turn (`+` and `-`)
scale        | `ScaleOptions`             | Scale config

The `ScaleConfig` has this properties:

Property          | Type      | Description
------------------|-----------|------------
ratio             | `number`  | Scale ratio (between `0` and `1`) to be applied when upscaling or downscaling
scaleStrokeSize   | `boolean` | Optional (default `false`), specifies if the stroke length must be scaled 
scaleStrokeWeight | `boolean` | Optional (default `false`), specifies if the stroke weight must be scaled
scaleAngle        | `boolean` | Optional (default `false`), specifies if the angle must be scaled
