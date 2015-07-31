/**
 * Backup postgres db.
 */
var child,
  exec = require('child_process').exec,
  os = require('os');
module.exports.backup = function(option, cb) {
  var config = require('../config.json').plan.db;
  var date = new Date();
  var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getTime();
  var file = os.tmpdir() + '/' + config.db + '-db-' + dateStr + '.gz';
  var command = 'pg_dump -h localhost -U ' + config.user + ' ' + config.db + ' | gzip > ' + file;
  console.log('Running command: "' + command + '"')
  child = exec(command, function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
  child.on('exit', function(code, signal) {
    console.log('Backup success, file path is : ', file);
    cb(null, file);
  });
}
