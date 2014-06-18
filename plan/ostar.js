var exec = require('child_process').exec,
  os = require('os'),
  child;
module.exports.backup = function(option, cb) {
  //var config = require('../config.json').plan.ostar;
  var file = os.tmpdir() + '/Users/onlinemad/tmp'.replace(/^.*[\\\/]/, '') + '.tar';
  child = exec('tar cf ' + file + ' /Users/onlinemad/tmp', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    cb(null, file);
  });
}