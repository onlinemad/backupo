/**
 * targz.js
 *
 */
var targz = require('tar.gz'),
  os = require('os'),
  debug = require('debug')('backupo');
module.exports.backup = function(option, cb) {
  var file = os.tmpdir() + '/targz.' + Date.now() + '.tar.gz';
  debug('targz.js', file);
  var compress = new targz().compress(option.src, file, function(err) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, file)
    }
  });
}
