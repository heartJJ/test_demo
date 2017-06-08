/**
 * 获取命令行参数
 */

process.argv.forEach(val => {
  console.log(val);
});

/**
 * 进程已退出，定时器里的代码将不会被执行
 */
process.on('exit', function () {
  setTimeout(function () {
    console.log('This will not run');
  }, 100);
  console.log('Bye.');
});