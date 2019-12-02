// Prime Spigot Stream
// Algorithm from https://en.wikipedia.org/wiki/Primality_test
// Harrison Powers

function isPrime(n) {
  if (n<=3) {
    return n > 1;
  } else if (n % 2 == 0 || n % 3 == 0) {
   return false;
  }
  let i = 5;
  while (i*i <= n) {
    if (n % i == 0 || n % (i + 2) == 0) {
      return false;
    }
    i += 6;
  }
  return true;
}

const { Readable } = require('stream');
class PrimeSpigot extends Readable {
  constructor(options) {
    super(options);
    this._inc = 0;
  }
  _read() {
    while (!isPrime(++this._inc)) {
      // keep counting
    }
    this.push(this._inc.toString());
  }
};

module.exports = PrimeSpigot;

if (!module.parent) {
  const out = new module.exports();
  out.on('data', chunk => process.stdout.write(`${chunk.toString('utf8')} `));
}
