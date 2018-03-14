/**
 * Google Cloud Storage Adapter
 *
 */
const fs = require('fs')
const path = require('path')
const Storage = require('@google-cloud/storage')
const debug = require('debug')('backupo')
const Bar = require('progress')
const mime = require('mime')

module.exports.save = (file, option, cb) => {
  console.log(`${new Date()} Upload ${file} to google cloud storage start.`)
  let storage = new Storage({
    keyFilename: option.keyFilename
  })

  let gcs_file = storage.bucket(option.bucket).file(path.basename(file))

  let bar = new Bar(new Date() + ' uploading [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: fs.statSync(file).size
  })

  fs.createReadStream(file).on('data', chunk => {
    bar.tick(chunk.length)
  }).pipe(gcs_file.createWriteStream({
    metadata: {
      contentType: mime.getType(file)
    }
  })).on('error', err => {
    console.error(err)
    return cb(err)
  }).on('finish', () => {
    console.log(`${new Date()} Upload ${file} to google cloud storage done.`)
    debug(gcs_file.metadata)
    return cb(null, gcs_file.metadata)
  })
}
