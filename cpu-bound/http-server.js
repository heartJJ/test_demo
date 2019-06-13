/**
 * 模拟CPU密集型任务，以及node 对应的2种处理方案
 * 
 * 方案一： setImmediate
 * 
 * 方案二： 线程池  个人测试效果更优
 */

'use strict';

const http = require('http');
const SubsetSum = require('./SubsetSum'); // 同步方法
const SubsetSumDefer = require('./SubsetSumDefer'); // 异步方法
const SubsetSumPool = require('./SubsetSumPool'); // 使用线程池的方式

/**
 * http servewr
 */
http.createServer((req, res) => {
  const url = require('url').parse(req.url, true);

  if ( ['/SubsetSum', '/SubsetSumDefer', '/SubsetSumPool'].includes(url.pathname) ) {
    const data = JSON.parse(url.query.data);
    res.writeHead(200);
  
    const CAL = require(`./${url.pathname}`); // 调用对应类
    const cal = new CAL(url.query.sum, data);

    cal.on('match', match => {
      res.write('Match: ' + JSON.stringify(match) + '\n');
    });
    cal.on('end', () => res.end());
    cal.start();

  } else {
    res.writeHead(200);
    res.end('I\m alive!\n');
  }

}).listen(8000, () => console.log('Started'));