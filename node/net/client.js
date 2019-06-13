const net = require('net') ;

const client = net.connect({
  port: 8124
}, function() { // connect监听器
  console.log('客户端已连接') ;
  // client.write('Hello,Baby !\r\n');

  let str = JSON.stringify({name: 'aaa'});

  client.write(str);
});

client.on('data', function(data) {
  console.log(data.toString()) ;
  client.end();
});

client.on('end', function(){
  console.log('客户端断开连接') ;
});