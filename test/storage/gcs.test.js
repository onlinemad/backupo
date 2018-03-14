const storage = require('../../storage/gcs')
const plan = require('../../plan/garbage')
describe.only('Unit Test for gcs.js.', () => {
  describe('#save()', () => {
    it('should backup file to google cloud storage', done => {
      plan.backup(null, (err, file) => {
        if (err) throw err
        let option = {
          keyFilename: 'keyFilename',
          bucket: 'bucket'
        }
        storage.save(file, option, (err, response) => {
          if (err) throw err
          done()
        })
      })
    })
  })
})
