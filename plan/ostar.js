/**
 * ostar.js
 *
 * OS build-in tar command.
 */
var exec = require('child_process').exec,
  os = require('os'),
  debug = require('debug')('backupo');
module.exports.backup = function(option, cb) {
  var tar_option = 'cf';
  var file = os.tmpdir() + Date.now() + '.tar';
  debug('ostar.js', file);
  if(option.option) {
    tar_option = option.option;
    if(tar_option.includes('z')){
      file += '.gz';
    } else if(tar_option.includes('j')){
      file += '.bz';
    }
  }
  var command = 'tar ' + tar_option + ' ' + file + ' ' + option.src;
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
