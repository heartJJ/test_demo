// 文件：gzip.js
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

// 压缩
function gzip(source) {
    // 处理输入和输出的文件路径
  let sourcePath = path.join(__dirname, source);
  let gzipPath = `${sourcePath}.zip`;


    // 创建转化流
  let gzip = zlib.createGzip();

    // 创建可读流
  let rs = fs.createReadStream(sourcePath);

    // 创建可写流
  let ws = fs.createWriteStream(gzipPath);

    // 实现转化
  rs.pipe(gzip).pipe(ws);
}

gzip('test.xls');
