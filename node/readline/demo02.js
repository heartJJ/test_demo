/**
 * tiny CLI
 */
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'TinyCLI>'  
});
rl.prompt();
rl.on('line', (line) => {
  switch(line.trim()) {
    case 'hello':
      console.log('world');
      break;
    default:
      console.log(`Say what? I might have heard '${line.trim()}'`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day, Bye!');
  //没有exit则会继续监听输入，线程并不会退出
  //process.exit(0);
}).on('SIGINT', () => {
  console.log('Ctrl+C => SIGINT');
});