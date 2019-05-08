const crypto = require('crypto');

const hash1 = crypto.createHash('md5');
const hash2 = crypto.createHash('md5');

// 可任意多次调用update():
hash1.update('Hello, world!');
hash1.update('Hello, nodejs!');
hash2.update('Hello, nodejs!');

console.log(hash1.digest('hex'));
console.log(hash2.digest('hex')); 