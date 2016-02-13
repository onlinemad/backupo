var expect = require('chai').expect;
var plan = require('../../plan/targz');
var fs = require('fs');

describe('Unit Test. Only test functionality of each method', function() {
  before(function() {
    fs.mkdirSync('targz');
  });
  after(function() {
    fs.rmdirSync('targz');
  });
  describe('#backup()', function() {
    it('should make a backup by compress.js', function(done) {
      var option = {
        src: 'targz'
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
