/**
 * Google Cloud Storage Adapter
 *
 */
var gcloud = require('gcloud'),
  debug = require('debug')('backupo');

module.exports.save = function(file, option, cb) {
  debug('gcs.js');
  var gcs = gcloud.storage({
    projectId: option.projectId,
    keyFilename: option.keyFilename
  });

  gcs.bucket(option.bucket).upload(file, cb);
}
