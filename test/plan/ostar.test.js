var expect = require('chai').expect;
var plan = require('../../plan/ostar');
var fs = require('fs');

describe('Unit Test. Only test functionality of each method', function() {
  before(function() {
    fs.mkdirSync('ostar');
  });
  after(function() {
    fs.rmdirSync('ostar');
  });
  describe('#backup()', function() {
    it('should make a backup by ostar.js', function(done) {
      var option = {
        src: 'ostar'
      }
      plan.backup(option, function(err, filepath) {
        if (err) throw err;
        var stat = fs.statSync(filepath);
        expect(stat.isFile()).to.be.true;
        done();
      });
    });
    it('should make a backup by ostar.js', function(done) {
      var option = {
        src: 'ostar',
        option: 'czf'
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
