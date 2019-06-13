var restify = require('restify');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  // next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);


function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


server.get('/async', async (req, res, next) => {
  await timeout(1000);
  res.send('rerurn');
  next();
});

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});

// 需显示调用next()方可触发
server.on('after', function(req, res, route, error) {
  console.log('after---', req.url);
});
