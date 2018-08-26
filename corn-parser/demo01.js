const parser = require('cron-parser');
const interval = parser.parseExpression('0 30 23 * * *');

//打印后面10次的执行时间
for (let i = 0; i < 10; ++i) {
	console.log(interval.next().toString());
}