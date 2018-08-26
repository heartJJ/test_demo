/**
 * utils.inherits 方法作用 相当于继承
 * 目前不推荐使用，用ES6 的 extends替代
 * 本处暂时使用一下
 */
const utils = require('util'),
  EventEmitter = require('events').EventEmitter;

const Server = function() {
  console.log('init');
};

utils.inherits(Server, EventEmitter);

const s = new Server();

s.on('abc', function() {
  console.log('abc');
});

s.emit('abc');