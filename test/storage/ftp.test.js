//var assert = require('chai').assert,
var storage = require('../../storage/ftp');
plan = require('../../plan/garbage')
describe('Unit Test.', function() {
  describe('#save()', function() {
    it('should backup file to google cloud storage', function(done) {
      plan.backup(null, function(err, file) {
        if (err) throw err;
        var option = {
          host: 'host',
          user: 'user',
          password: 'password',
          confirm: true
        }
        storage.save(file, option, function(err, response) {
          if (err) throw err;
          console.log(response);
          done();
        });
      });
    })
  });
});
