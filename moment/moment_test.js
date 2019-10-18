const moment = require('moment');



// let a = new Date(moment({ hour: 8, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days'));


// let b = moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days');

// console.log(a);

// console.log(b);

// ret_date=new Date(1900,0,42913-1);
// console.log(ret_date);

// let time = moment(Date.now());

// console.log(Date.parse(time));

// time.hour(0).minute(0).second(0).millisecond(0).date(time.date()+1);
// console.log(Date.parse(time));


// console.log( moment(1500000000000).format('YYYY/MM/DD HH:mm:SS'));   // 2017/07/14 10:40:00


// console.log( moment().utcOffset(480)  );

// console.log( moment().utcOffset(480).valueOf()  );

// console.log( moment() );

// console.log( moment().valueOf() );

const timezone = new Date().getTimezoneOffset();

const str = moment(1561105500339 + (timezone + 480) * 60 * 1000 ).format('YYYY-MM-DD HH:mm:ss');

console.log(str);


console.log(moment(1561105500339).valueOf() );