const net = require('net');

const server = net.createServer(function(socket) { // Connection监听器
  console.log('服务器已连接') ;


  socket.on('end', function() {
    console.log('服务器已断开') ;
  }) ;

  socket.on('data', (data) => {
    let name = JSON.parse(data.toString() ).name;
    console.log(name);
    socket.write('Hello,Bigbear !\r\n') ;
  });

  // socket.pipe(c) ; // 直接将内容回传给client
});

server.listen(8124, function() { // Listening监听器
  console.log('服务器已绑定') ;
}) ;