// Pi Spigot Stream
// Harrison Powers
// Uses Javascript built-in BigInt ("n" suffix)
// piG3 algorithm 
// page 10 http://www.cs.ox.ac.uk/people/jeremy.gibbons/publications/spigot.pdf

const { Readable } = require('stream');
class PiSpigot extends Readable {
  constructor(options) {
    super(options);
    this._q = 1n;
    this._r = 180n;
    this._t = 60n;
    this._i = 2n;
  }
  _read() {
    const d = this.calculate();
    this.push(String(d));
  }
  calculate() {
    const u = 3n*(3n*this._i+1n)*(3n*this._i+2n);
    const y = (this._q*(27n*this._i-12n)+5n*this._r)/(5n*this._t);
    this._r = 10n*u*(this._q*(5n*this._i-2n)+this._r-y*this._t);
    this._q = 10n*this._q*this._i*(2n*this._i-1n);
    this._t = this._t*u;
    this._i = this._i+1n;
    if (this._i === 3n) { return `${y}.`; }
    return y;
  }
};

module.exports = PiSpigot;
if (!module.parent) {
  const out = new module.exports();
  out.pipe(process.stdout);
}
