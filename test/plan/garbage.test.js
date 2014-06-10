//var assert = require('chai').assert,
var plan = require('../../plan/garbage');

describe('Unit Test. Only test functionality of each method', function() {
  describe('#backup()', function() {
    it('should make a backup by garbage.js', function(done) {
      plan.backup(null, function(err, file) {
        if (err) throw err;
        console.log(file);
        done();
      });
    })
  });
});