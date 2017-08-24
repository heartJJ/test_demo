const moment = require('moment');

let a = new Date(moment({ hour: 8, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days'));


let b = moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days');

console.log(a);

console.log(b);

ret_date=new Date(1900,0,42913-1);
console.log(ret_date);




let aa = '1';
let bb;

switch(aa) {
  case 1: bb =1;break;
  case '1': bb = 2; break;
  default: bb =0; 
}

console.log(bb);
