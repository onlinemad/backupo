/**
 * tar.js
 * 
 */
var tar = require('tar'),
  fstream = require("fstream"),
  os = require('os'),
  debug = require('debug')('backupo');
module.exports.backup = function(option, cb) {
  var file = os.tmpdir() + Date.now() + '.tar';
  debug('tar.js', file);
  var pack = tar.Pack();
  var writer = fstream.Writer(file);
  pack.on('end', function() {
    console.log('pack end');
    //cb();
  });
  writer.on("close", function() {
    console.log('writer end');
    cb(null, file);
  });
  fstream.Reader({
    path: option.src,
    type: 'Directory'
  }).pipe(pack).pipe(writer);
}