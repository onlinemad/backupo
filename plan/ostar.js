/**
 * ostar.js
 *
 * OS build-in tar command. 
 */
var exec = require('child_process').exec,
  os = require('os'),
  debug = require('debug')('backupo');
module.exports.backup = function(option, cb) {
  var file = os.tmpdir() + Date.now() + '.tar';
  debug('ostar.js', file);
  var command = 'tar cf ' + file + ' ' + option.src;
  debug('ostar.js', command);
  var child = exec(command, function(error, stdout, stderr) {
    debug('ostar.js', 'stdout', stdout);
    debug('ostar.js', 'stderr', stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    cb(null, file);
  });
}