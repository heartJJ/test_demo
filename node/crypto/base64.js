const crypto = require('crypto');
const fs = require('fs');


const buffer = Buffer.from(fs.readFileSync('./1554355253543.jpg'));

console.log(buffer.toString('base64') );