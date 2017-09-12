const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * 主动输出，并接受回应，该事件触发时，第一次输入流不会被 line事件监听
 */
// rl.question('please input something ... \n', (word) => {
//   console.log(`I guess you say , ${word}`);
//   // rl.close();
// });

/**
 * 无论何时都会接受 输入流数据， 以 \n, \r, \n\r为每一次结束标志
 */
rl.on('line', (input) => {
  console.log(`received: ${input}`);
  if (input === 'pause') {
    rl.pause();
  }
});

/**
 * 监听 Ctrl-C
 */
rl.on('SIGINT', () => {
  console.log('if you want to exist, please enter Ctrl-D');
});

/**
 * 暂停, ctrl-d 也会触发，但程序退出
 */
rl.on('pause', () => {
  console.log('input pause');
  rl.resume();
});

/**
 * 恢复
 */
rl.on('resume', () => {
  console.log('resume input');
});

/**
 * 监听 Ctrl-Z， 若未定义该事件，则进程会被移交给后台
 */
// rl.on('SIGTSTP', () => {
//   console.log('you input ctrl-z');
//   // rl.prompt(); // 默认输出 '> -'
// });


/**
 * 目前仅知道监听 Ctrl-D
 */
// rl.on('SIGCONT', () => {
//   console.log('you input ctrl-d');
// });