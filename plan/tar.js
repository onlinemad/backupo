/**
 * Tar folder.
 */
var tar = require('tar'),
  fstream = require("fstream"),
  os = require('os');
module.exports.backup = function(option, cb) {
  var file = os.tmpdir() + '/Users/onlinemad/tmp'.replace(/^.*[\\\/]/, '') + '.tar';
  var pack = tar.Pack();
  var writer = fstream.Writer(file);
  pack.on('end', function () {
    console.log('pack end');
    //cb();
  });
  writer.on("close", function () {
    console.log('writer end');
    cb(null, file);
  });
  fstream.Reader({path: '/Users/onlinemad/tmp', type: 'Directory'}).pipe(pack).pipe(writer);
}