/**
 * FTP Adapter
 *
 */
var FTP = require('ftp');
module.exports.save = function(file, cb) {
  var ftp = new FTP();
  var config = require('../config.json').storage.ftp;
  var fileName = file.replace(/^.*[\\\/]/, '');
  ftp.on('ready', function() {
    ftp.put(file, fileName, function(err) {
      if (err) {
        console.log(err);
        ftp.end();
        return cb(err);
      } else {
        if (config.confirm) {
          ftp.list(function(err, list) {
            if (err) {
              console.log(err);
              ftp.end();
              return cb(err);
            } else {
              for (var i = 0; i < list.length; i++) {
                if(fileName === list[i].name){
                  ftp.end();
                  return cb(null, true);
                }
              };
              ftp.end();
              return cb(null, false);
            }
          });
        } else {
          ftp.end();
          return cb(null, true);
        }
      };
    });
  });
  ftp.connect(config);
}