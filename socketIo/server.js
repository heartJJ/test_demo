const app = require('http').createServer(handler),
  io = require('socket.io')(app),
  fs = require('fs');

const Redis = require('ioredis'),
  redis = new Redis('6379');

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', async (socket) => {
  const keys = await redis.keys('*');

  for (let key of keys) {
    console.log(key);
    socket.to(key).emit('news', 'this is new msg');
  }


  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
});