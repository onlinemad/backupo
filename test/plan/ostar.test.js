//var assert = require('chai').assert,
var plan = require('../../plan/ostar');

describe('Unit Test. Only test functionality of each method', function() {
  describe('#backup()', function() {
    it('should make a backup by compress.js', function(done) {
      plan.backup(null, function(err, filepath) {
        if (err) throw err;
        console.log(filepath);
        done();
      });
    })
  });
});