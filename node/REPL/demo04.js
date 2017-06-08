process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {

  process.stdout.write('请输入add（增量）或cover（覆盖）来选择更新模式\n');

  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
  
  // if (chunk !== 'add' || chunk !== 'cover') {
  //   process.stdout.write('输入不合法，请重新输入\n');
  //   type = process.stdin.read();
  // }


});

process.stdin.on('end', () => {
  process.stdout.write('end');
});