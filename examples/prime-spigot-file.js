const PrimeSpigot = require('../index').prime;
const spigot = new PrimeSpigot();

const fs = require('fs');
const pathname = require('path').join(__dirname, 'output/primes.txt');
const dest = fs.createWriteStream(pathname);

const { Transform } = require('stream');
const addNewlines = new Transform({
  transform(chunk, encoding, callback) {
    const data = `${chunk.toString('utf8')}\n`;
    this.push(Buffer.from(data));
    callback();
  }
});

let total = 1n;
const ProgressBar = require('progress');
const bar = new ProgressBar('  generating primes ~ :rate/pps', {
    complete: '=',
    incomplete: ' ',
    total: 1e150,
    width: 20
  });
const showProgress = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk); 
    bar.tick(1);
    total = total + 1n;
    callback();
  }
});

spigot
  .pipe(showProgress)
  .pipe(addNewlines)
  .pipe(dest);

function exitHandler(options, err) {
  if (err) console.log(`\nFATAL ${err.stack||err.message||err}`);
  if (options.exit) {
    dest.on('finish', process.exit);
    spigot.destroy();
  } else {
    console.log(`\n${total} primes written to ${pathname}`);
  }
};
process.on('exit', exitHandler.bind(null, {}));
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
