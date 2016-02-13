//var assert = require('chai').assert,
var plan = require('../../plan/ostar');

describe('Unit Test. Only test functionality of each method', function() {
  describe('#backup()', function() {
    it('should make a backup by ostar.js', function(done) {
      var option = {
        src: 'ostar'
      }
      plan.backup(option, function(err, filepath) {
        if (err) throw err;
        console.log(filepath);
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
