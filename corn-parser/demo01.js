const parser = require('cron-parser');

// const interval = parser.parseExpression('0 15 10 ? * 4#2');
const interval = parser.parseExpression('0 */20 8-20 * * *');

//打印后面10次的执行时间
for (let i = 0; i < 10; ++i) {
  console.log(new Date(interval.next()._date.valueOf()));
}
