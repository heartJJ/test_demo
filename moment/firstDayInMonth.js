const moment = require('moment');

const end = moment().hour(0).minute(0).second(0).millisecond(0).valueOf();

console.log(end);

console.log(new Date(end));

console.log(new Date(end).getDate());

const a = new Date(moment(1585411200000).format('YYYY-MM-DD')).getTime();

console.log(moment(1585411200000).format('YYYY-MM-DD'));

console.log(a);

console.log(new Date(a));

