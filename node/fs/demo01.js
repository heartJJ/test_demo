const fs = require('fs');
const path = require('path');

console.log(fs.existsSync(path.resolve(__dirname, 'demo02.js')));

console.log(fs.existsSync(path.resolve(__dirname, 'demo03.js')));