const fs = require('fs');
const path = require('path');

module.exports = {};

fs.readdirSync(path.join(__dirname,'lib')).forEach(file => {
  module.exports[path.basename(file,'.js')] =
    require(path.join(__dirname,'lib',file));
});
