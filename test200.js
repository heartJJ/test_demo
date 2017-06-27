const moment = require('moment');

let a = new Date(moment({ hour: 8, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days'));


let b = moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days');

console.log(a);

console.log(b);

ret_date=new Date(1900,0,42913-1);
console.log(ret_date);