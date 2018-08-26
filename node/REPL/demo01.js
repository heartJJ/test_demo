#!/usr/bin/env node
// function read(prompt) {
//   process.stdout.write(prompt + ':');
//   process.stdin.resume();  // 不让控制台退出
//   process.stdin.setEncoding('utf-8');
//   process.stdin.on('data', function(chunk) {
//     process.stdout.write('output: ' + chunk);
//     process.exit();
//   });
// }

// read('input');


/**
 * 输入时自带换行符，占2个长度
 */
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (Object.prototype.toString.call(chunk) === '[object String]') {
    process.stdout.write(`切割前: ${chunk.length}\n`);
    chunk = chunk.substring(0, chunk.length -2);
    process.stdout.write(`切割后: ${chunk.length}\n`);
  }
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}\n`);
  } 
  if (chunk === '') {
    process.stdin.emit('end');
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});



