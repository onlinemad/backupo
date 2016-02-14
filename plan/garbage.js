/**
 * garbage.js
 *
 * Generate a garbage backup file for testing.
 */
var fs = require('fs'),
  os = require('os'),
  debug = require('debug')('backupo');
module.exports.backup = function(option, cb) {
  var file = os.tmpdir() + '/garbage.' + Date.now() + '.txt';
  debug('garbage.js', file);
  fs.writeFile(file, Math.random(), function(err) {
    if (err) {
      cb(err);
    } else {
      cb(null, file);
    }
  });
}
