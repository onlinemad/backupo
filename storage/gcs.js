/**
 * Google Cloud Storage Adapter
 *
 */
var config = require('../config.json'),
  TokenCache = require('google-oauth-jwt').TokenCache,
  fs = require('fs'),
  request = require('request');

module.exports.save = function(file, cb) {
  var tokens = new TokenCache();
  var config = require('../config.json').storage.google;
  tokens.get(config, function(err, token) {
    if (err) {
      console.log(err);
      return cb(err);
    } else {
      var url = 'https://www.googleapis.com/upload/storage/v1beta2/b/' + config.bucket + '/o?uploadType=media&name=' + encodeURIComponent(file.replace(/^.*[\\\/]/, ''));
      fs.createReadStream(file).pipe(request.post({
        url: url,
        headers: {
          Authorization: 'Bearer ' + token,
          'x-goog-api-version': 2
        }
      }, function(err, res, body) {
        if (err) {
          console.log(err);
          return cb(err);
        } else {
          return cb(null, body);
        }
      }));
    }
  });
}