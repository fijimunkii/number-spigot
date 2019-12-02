// Euler Number Spigot Stream
// Harrison Powers
// algorithm: https://de.wikipedia.org/wiki/Tröpfelalgorithmus
// TODO: relies on a fat lookup table. improve this
// array metrics https://stackoverflow.com/a/58743798/2474735

const { Readable } = require('stream');
class EulerSpigot extends Readable {
  constructor(options) {
    super(options);
    this._N = 1e150; // number of digits
    // m! needs to be at least n
    // 1e2! is ~1e157
    this._m = 1e2;
    this._B = [...Array(this._m)].map((d,i) => i+2);
    this._inc = 0;
    this._cache = [...Array(this._m)].map(() => 1);
    this.push('2.');
  }
  _read() {
    let d;
    [d, this._cache] = this.calculate(++this._inc, this._cache);
    this.push(d);
  }
  calculate(position, prevRow) {
    if (position === this._N) {
      return [];
    }
    let carry = 0;
    const row = [];
    for (let i=this._m-2; i>=0; i--) {
      const temp = prevRow[i] * 10 + carry;
      row[i] = temp % this._B[i];
      carry = Math.floor(temp/this._B[i]);
    }
    return [carry.toString(), row];
  }
};

module.exports = EulerSpigot;
if (!module.parent) {
  const out = new module.exports();
  out.pipe(process.stdout);
}
