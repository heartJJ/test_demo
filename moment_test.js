const moment = require('moment');

const a = moment('2016-12-25');
const b = moment('20161225');
// console.log(Object.prototype.toString.call(a));

console.log(Date.parse(a));
console.log(Date.parse(b));