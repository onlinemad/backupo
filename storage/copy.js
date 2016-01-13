/**
 * copy.js
 *
 * Copy Adapter
 *
 */
var exec = require('child_process').exec
  debug = require('debug')('backupo');

module.exports.save = function(file, option, cb) {
  var command = 'cp -rf ' + file + ' ' + option.dest;
  debug('copy.js', command);
  var child = exec(command, function(error, stdout, stderr) {
    debug('copy.js', 'stdout', stdout);
    debug('copy.js', 'stderr', stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    cb(null, file + ' has beed copied to ' + option.dest);
  });
}
