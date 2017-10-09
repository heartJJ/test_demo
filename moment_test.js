const moment = require('moment');

const aa = moment('2016-01-10');
const cc = moment('20161201');
// console.log(Object.prototype.toString.call(a));

console.log(Date.parse(aa));
console.log(Date.parse(cc));




let a = new Date(moment({ hour: 8, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days'));


let b = moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days');

console.log(a);

console.log(b);

ret_date=new Date(1900,0,42913-1);
console.log(ret_date);