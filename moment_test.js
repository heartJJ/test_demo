const moment = require('moment');

// const aa = moment('2014-11-01');
// const cc = moment('2024-11-01');
// // console.log(Object.prototype.toString.call(a));

// console.log(Date.parse(aa));
// console.log(Date.parse(cc));




// let a = new Date(moment({ hour: 8, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days'));


// let b = moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days');

// console.log(a);

// console.log(b);

// ret_date=new Date(1900,0,42913-1);
// console.log(ret_date);

let time = moment(Date.now());

console.log(Date.parse(time));

time.hour(0).minute(0).second(0).millisecond(0).date(time.date()+1);
console.log(Date.parse(time));


console.log( moment(1500000000000).format('YYYY/MM/DD'));

// console.log(time.year() );


// console.log(time.month() );
