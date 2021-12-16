const crypto = require('crypto');

const str = 'quick as `12c'; // 待加密串
const md5 = crypto.createHash('md5');
const str_s = md5.update(str).digest('hex');
console.log(str_s);