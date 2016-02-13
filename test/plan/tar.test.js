var expect = require('chai').expect;
var plan = require('../../plan/tar');
var fs = require('fs');

describe('Unit Test. Only test functionality of each method', function() {
  before(function() {
    fs.mkdirSync('tar');
  });
  after(function() {
    fs.rmdirSync('tar');
  });
  describe('#backup()', function() {
    it('should make a backup by compress.js', function(done) {
      var option = {
        src: 'tar'
      }
      plan.backup(option, function(err, filepath) {
        if (err) throw err;
        var stat = fs.statSync(filepath);
        expect(stat.isFile()).to.be.true;
        done();
      });
    })
  });
});
