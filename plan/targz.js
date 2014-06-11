/**
 * Tar.gz folder.
 */
var targz = require('tar.gz'),
  os = require('os');
module.exports.backup = function(option, cb) {
  var config = require('../config.json').plan.targz;
  var filepath = os.tmpdir() + config.folder.replace(/^.*[\\\/]/, '') + '.tar.gz';
  var compress = new targz().compress(config.folder, filepath, function(err) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, filepath)
    }
  });
}