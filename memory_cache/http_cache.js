const http = require('http'),
  cache = require('memory-cache');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
 
    // 解析 url 参数
    //var params = url.parse(req.url, true).query;
    // res.write("网站名：" + params.name);
    // res.write("\n");
    // res.write("网站 URL：" + params.url);
    // res.end();
    const message = cache.get('order');
    if(!message) {
      cache.put('order', '123456');
    }
    console.log('message为', message);
    res.end();

 
}).listen(3000);