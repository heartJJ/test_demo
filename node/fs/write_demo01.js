const fs = require('fs'),
  path = require('path');

const a = [
  'SPBH: 1231213, SPPH: 112313',
  'SPBH: 12313131231, SPPH: 10010101'
];

if (fs.existsSync(path.resolve(__dirname, 'a.txt'))) {
  fs.truncateSync(path.resolve(__dirname, 'a.txt'));
  fs.appendFileSync(path.resolve(__dirname, 'a.txt'), '这是第一行\n');
  fs.appendFileSync(path.resolve(__dirname, 'a.txt'), '这是第二行\n');
  fs.appendFileSync(path.resolve(__dirname, 'a.txt'), `${a.map(val => val)}\n`);
} else {
  console.log('12312');
  fs.writeFileSync(path.resolve(__dirname, 'a.txt'));
  fs.truncateSync(path.resolve(__dirname, 'a.txt'));
}

// if (!fs.existsSync(path.resolve(__dirname, 'a.txt'))) {
//   fs.writeFileSync(path.resolve(__dirname, 'a.txt', 'aaaa'));
// }



process.exit();