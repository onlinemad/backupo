var expect = require('chai').expect;
var plan = require('../../plan/postgres');

describe('Unit Test. Only test functionality of each method', function() {
  describe('#backup()', function() {
    it('should make a backup by postgres.js', function(done) {
      var option = {
        user: 'user',
        db: 'user'
      };
      plan.backup(option, function(err, file) {
        if (err) throw err;
        console.log(file);
        done();
      });
    })
  });
});
