const numberSpigot = require('../index');
const EulerSpigot = numberSpigot.e;
const PiSpigot = numberSpigot.pi;
const PrimeSpigot = numberSpigot.prime;
const euler1e2 = '2.71828182845904523536028747135266249775724709369995957496696762772407663035354759457138217852516642';
const pi1e2 = '3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706';
const primes1e2 = '2357111317192329313741434753596167717379838997101103107109113127131137139149151157163167173179181191'

module.exports = async t => {
  t.test('index is an object of spigots', async (t) => {
    t.type(numberSpigot, 'Object');
  });
  t.test('e - generates euler number to 1e2 digits', async (t) => {
    await new Promise(resolve => {
      const spigot = new EulerSpigot();
      let e = '';
      spigot.on('data', chunk => {
        e+=chunk.toString();
        if (e.length > 1e2) {
          spigot.destroy();
        }
      });
      spigot.on('close', () => {
        t.equal(e.slice(0,100), euler1e2);
        resolve();
      });
    });
  });
  t.test('pi - generates pi to 1e2 digits', async (t) => {
    await new Promise(resolve => {
      const spigot = new PiSpigot();
      let pi = '';
      spigot.on('data', chunk => {
        pi+=chunk.toString();
        if (pi.length > 1e2) {
          spigot.destroy();
        }
      });
      spigot.on('close', () => {
        t.equal(pi.slice(0,100), pi1e2);
        resolve();
      });
    });
  });
  t.test('pi - generates primes to 1e2 digits', async (t) => {
    await new Promise(resolve => {
      const spigot = new PrimeSpigot();
      let primes = '';
      spigot.on('data', chunk => {
        primes+=chunk.toString();
        if (primes.length > 1e2) {
          spigot.destroy();
        }
      });
      spigot.on('close', () => {
        t.equal(primes.slice(0,100), primes1e2);
        resolve();
      });
    });
  });
};

if (!module.parent) module.exports(require('tap'));
