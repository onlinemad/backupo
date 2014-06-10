/**
 * Generate a garbage backup file for testing.
 */
var fs = require('fs'),
  os = require('os');
module.exports.backup = function(option, cb) {
  var file = os.tmpdir() + (new Date()).getTime() + '.txt';
  fs.writeFile(file, Math.random(), function(err) {
    if (err) {
      cb(err);
    } else {
      cb(null, file);
    }
  });
}