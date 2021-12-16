const moment = require('moment');

console.log(new Date().getTimezoneOffset());

// console.log(moment(1593187200000).format());

// console.log(moment(1592498099883).format());

// console.log(moment(1593498069633).format());


console.log( moment(moment().subtract('days', 6).format('YYYY-MM-DD')).valueOf());