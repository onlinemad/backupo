/**
 * postgres.js
 *
 * Backup postgres db.
 */
var spawn = require('child_process').spawn,
  fs = require('fs'),
  os = require('os'),
  debug = require('debug')('backupo');

var plan = 'postgres.js';

module.exports.backup = function(option, cb) {
  var date = new Date();
  console.log(date + ' start ' + plan + ' backup.');

  var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getTime();
  var file = os.tmpdir() + '/' + option.db + '-db-' + dateStr + '.gz';
  debug('postgres.js', file);

  var pg_dump = spawn('pg_dump', ['-h', option.host, '-U', option.user, option.db]);
  var gzip = spawn('gzip');
  var save = fs.createWriteStream(file);

  pg_dump.stdout.on('data', (data) => {
    gzip.stdin.write(data);
  });

  pg_dump.stderr.on('data', (data) => {
    console.log('pg_dump error.', data.toString());
  });

  pg_dump.on('close', (code) => {
    debug('postgres.js', 'pg_dump close');
    gzip.stdin.end();
  });

  gzip.stdout.on('data', (data) => {
    save.write(data);
  });

  gzip.stderr.on('data', (data) => {
    console.log('gzip error.', data.toString());
  });

  gzip.on('close', (code) => {
    debug('postgres.js', 'gzip close');
    save.end();
    cb(null, file);
  });
}
