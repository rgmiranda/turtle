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

### Rules