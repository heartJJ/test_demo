var cp = require('child_process');

process.send('hello I am child');

process.on('message',function(m){
  console.log(m);
  console.log('child exist');
  process.exit(0);
});
