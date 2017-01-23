var cp = require('child_process');
var cat = cp.spawn('cat');
cat.stdout.on('data', function(d) {
　　console.log(d.toString());
});
cat.on('exit', function() {
　　console.log('kthxbai');
});
cat.stdin.write('meow');
cat.stdin.end();

