const fs = require('fs'),
  path = require('path'),
  iconv = require('iconv-lite');


const readExcel = () => {
  // const ws = fs.createWriteStream(path.resolve(__dirname, 'a.csv'));
  const rs = fs.createReadStream(path.resolve(__dirname, '../node/path.js'));
  //rs.setEncoding('gbk');
  let chunks = [],
    size = 0;
  rs.on('data', chunk => {
    chunks.push(chunk);
    size += chunk.length;
  });

  rs.on('end', () => {
    const buf = Buffer.concat(chunks, size);
    // const str=iconv.decode(buf,'utf-8');
    console.log(buf.toString());
  });
  // let data = '';
  // rs.on('data',function(trunk){
  //   data+=trunk;
  // });
  // rs.on('end',function(){
  //   console.log(data);
  // });


};

readExcel();

