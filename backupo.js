var plans = [];
var storages = [];

exports.run = function(plan_path){
  var config = require(plan_path);
  for(p in config.plan) {
    require('./plan/' + p).backup(config.plan[p], function(err, file) {
      for(s in config.storage) {
        require('./storage/' + s).save(file, config.storage[s], function(err, res){
          console.log(res);
        });
      }
    });
  }
}