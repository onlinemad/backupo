var plans = [];
var storages = [];

require("fs").readdirSync("./plan").forEach(function(file) {
  plans.push(require("./plan/" + file));
});

require("fs").readdirSync("./storage").forEach(function(file) {
  storages.push(require("./storage/" + file));
});

for (var i = 0; i < plans.length; i++) {
  plans[i].backup(null, function(err, file) {
    for (var j = 0; j < storages.length; j++) {
      storages[j].save(file, function(err, res) {
        console.log(res);
      });
    };
  });
};