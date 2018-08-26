const repl = require('repl');

const r = repl.start('> ');

const c = r.context; // 上下文

c.print = () => {
  console.log('this is NODE REPL');
};