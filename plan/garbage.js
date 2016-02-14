/**
 * garbage.js
 *
 * Generate a garbage backup file for testing.
 */
var fs = require('fs'),
  os = require('os'),
  debug = require('debug')('backupo');

var plan = 'garbage.js';

module.exports.backup = function(option, cb) {
  console.log(new Date() + ' start ' + plan + ' backup.');
  var file = os.tmpdir() + '/garbage.' + Date.now() + '.txt';
  debug(plan, file);
  fs.writeFile(file, Math.random(), function(err) {
    if (err) {
      cb(err);
    } else {
      console.log(new Date() + ' backup plan ' + plan + ' done. backuped file ' + file);
      cb(null, file);
    }
  });
}
