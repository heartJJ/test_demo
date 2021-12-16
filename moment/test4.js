const moment = require('moment');


// console.log(moment().format());
// console.log(moment.utc().format());


// console.log(moment(1600790400000).diff(moment(1600477200000), 'days', true));


// console.log(moment('Tue Aug 10 2021 09:00:00 GMT+0800').valueOf());


// console.log('当前timezone', new Date().getTimezoneOffset());

// console.log('转换值为', new Date('Aug 10, 2021 9:00:00 AM').getTime());

// console.log('带时区转换值为', new Date('Tue Aug 10 2021 09:00:00 GMT+0800').getTime());

extraKey = ['stock_sale_type', 'province', 'restore_price', 'rebate_amount', 'original_agent'];
const r = extraKey.reduce((p, c) => {
  console.log(p, c);
  p[c] = null;
  return p;
}, {});

console.log(r);