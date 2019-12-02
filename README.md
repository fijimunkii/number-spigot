# Node.js Number Spigot

Streaming number generator for `e` `π` and primes using [spigot algorithms](https://en.wikipedia.org/wiki/Spigot_algorithm)

Node.js streams handle backpressure

Pipe a number spigot and stream numbers

Example:

* run as cli
```sh
node lib/prime
```

* pipe with bash
```sh
node lib/pi | less 
node lib/prime > primes.txt
```

* pipe into your node app
```js
const EulerSpigot = require('number-spigot').e;
const spigot = new EulerSpigot();
spigot
  .pipe(myTransform)
  .pipe(process.stdout);
```

For more complete examples, [look into the examples folder](./examples)
