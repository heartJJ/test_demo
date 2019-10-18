const moment = require('moment');
// process.TZ = 'Europe/London';

const timezone = new Date().getTimezoneOffset();

console.log(timezone);


const a = 1551369600000;
const b = moment(a).utcOffset(480).add(1, 'M').valueOf();

console.log(b);

console.log( (b-a)/1000/3600/24 );

console.log(new Date(b));

console.log('---------------');

const c = moment(a).utcOffset(480).add(1, 'w').valueOf();

console.log(c);

console.log( (c-a)/1000/3600/24 );

console.log(new Date(c));