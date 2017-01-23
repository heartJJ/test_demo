var fs = require('fs')
fs.createReadStream('../abc/first.js').pipe(process.stdout);

// 创建一个可读流
var readerStream = fs.createReadStream('../abc/first.js');

// 创建一个可写流
var writerStream = fs.createWriteStream('../abc/second.js');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);

console.log("程序执行完毕");