/**
 * 按行读取文件
 */
const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
  input: fs.createReadStream('file path here...'),
  terminal: true
});
rl.on('line', (line) => {
  console.log('line = ', line);
}).on('close', () => {
  console.log('readline is closed');
});