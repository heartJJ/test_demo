//公共引用
const fs = require('fs'),
  path = require('path');


let string = 'aaaaaaaaabbbbbbbbbbb';

fs.appendFileSync(__dirname + '/aaa.txt', string);

console.log('执行完毕');