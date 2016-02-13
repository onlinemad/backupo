/**
 * Google Cloud Storage Adapter
 *
 */
var fs = require('fs'),
  path = require('path'),
  gcloud = require('gcloud'),
  debug = require('debug')('backupo'),
  mime = require('mime');

module.exports.save = function(file, option, cb) {
  debug('gcs.js');
  var gcs = gcloud.storage({
    projectId: option.projectId,
    keyFilename: option.keyFilename
  });
  var bucket = gcs.bucket(option.bucket);

  var metadata = {};
  metadata.contentType = mime.lookup(file);

  var localReadStream = fs.createReadStream(file);

  var gcs_file = bucket.file(path.basename(file));
  var remoteWriteStream = gcs_file.createWriteStream({
    metadata: metadata
  });
  remoteWriteStream.on('error', function(err) {
    console.log(err);
    return cb(err);
  })
  remoteWriteStream.on('finish', function() {
    console.log('done');
    return cb(null);
  });
  localReadStream.pipe(remoteWriteStream);
}
