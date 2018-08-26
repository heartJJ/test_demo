const moment = require('moment');


// console.log( moment([2018,1,1])  > moment([2018,0,31,23,59,59,999]) );

console.log(Date.parse(moment([2018,1,1])));
console.log(Date.parse(moment([2018,0,31,23,59,59,999])));

// let time = moment(Date.now()),
//   year = time.year(),
//   month = time.month(),
//   date = time.date();

// let new_time = moment([year, month, date]);

// console.log(new_time);

// new_time.

// new_time.date(19);

// console.log(new_time);

// new_time.date(40);

// console.log(new_time);