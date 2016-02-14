/**
 * Google Cloud Storage Adapter
 *
 */
var fs = require('fs'),
  path = require('path'),
  gcloud = require('gcloud'),
  debug = require('debug')('backupo'),
  ProgressBar = require('progress'),
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
    console.log(new Date(), file, 'upload to google cloud storage done.');
    return cb(null);
  });
  var stat = fs.statSync(file);
  var bar = new ProgressBar(new Date() + ' uploading [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: stat.size
  });
  localReadStream.on('data', function (chunk) {
    bar.tick(chunk.length);
  });
  localReadStream.pipe(remoteWriteStream);
}
