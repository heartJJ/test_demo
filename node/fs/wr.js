const fs = require('fs'),
  path = require('path'),
  iconv = require('iconv-lite');


const handleExcel = () => {

  const rs_gbk = fs.createReadStream(path.resolve(__dirname, './test_file/工作簿.csv')),
    rs_unicode = fs.createReadStream(path.resolve(__dirname, './test_file/utf-8.csv'));
  // readByString(rs_unicode);
  readByBuffer(rs_gbk);


  // const ws_gbk = fs.createWriteStream(path.resolve(__dirname, './test_file/write_gbk.txt')),
  //   ws_unicode = fs.createWriteStream(path.resolve(__dirname, './test_file/write_unicode.txt'));

  // rs_gbk.pipe(ws_gbk);
  // rs_unicode.pipe(ws_unicode);

  // const ws = fs.createWriteStream(path.resolve(__dirname, './test_file/write_test.txt'));
  // ws.write('这是测试所用的文字');
  // ws.end();   // wrote_test.txt utf-8


  // fs.createReadStream(path.resolve(__dirname, './test_file/工作簿.csv'))
  //   .pipe(iconv.decodeStream('GB18030'))
  //   .pipe(iconv.encodeStream('utf8'))
  //   .pipe(fs.createWriteStream(path.resolve(__dirname, './test_file/write_gbk_iconv.txt')));
};

const readByString = (rs) => {
  let data = '';
  rs.on('data',  chunk => {
    data += chunk.toString('utf8');
  });
  rs.on('end', () => {
    console.log(data);
  });
};

const readByBuffer = rs => {
  let chunks = [],
    size = 0;
  rs.on('data', chunk => {
    chunks.push(chunk);
    size += chunk.length;
  });
  rs.on('end', () => {
    let buf = Buffer.concat(chunks, size);
    // console.log(buf.toString());
    console.log(iconv.decode(buf, 'GBK'));
  });
};

handleExcel();