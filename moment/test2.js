const moment = require('moment');

// console.log(moment('12-25-1995', 'MM-DD-YYYY'));

let time = moment(Date.now()),
  year = time.year(),
  month = time.month(),
  date = time.date();

let new_time = moment([year, month, date]);

console.log(new_time);

let new_week = new_time.day(0 + 7);

console.log(new_week);

let new_month = new_time.date(1);

console.log(new_month);

let new_year = new_time.month(0).date(1);

console.log(new_year);


// console.log(time.year());

// console.log(time.month());

// console.log(time.day());


// console.log(time.date());




