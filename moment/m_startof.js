const moment = require('moment');

// const add = (c, i, timezone = -480) => {
//   const a = moment(c).utcOffset(-timezone).add(i, 'month').valueOf();
//   console.log(a, new Date(a));
// };

// [1, 2, 3, 4, 5].fill(1556640000000).forEach((v, i) => {
//   add(v, i);
// });


// console.log((moment().add(1, 'M').valueOf() - Date.now()) / 1000 / 3600 / 24);
// console.log((moment().utcOffset(-480).add(1, 'M').valueOf() - Date.now()) / 1000 / 3600 / 24);


// console.log(moment(1556640000000).utcOffset(480).format('YYYY-MM-DD')  );
// console.log(moment(1556640000000).utcOffset(-480).format('YYYY-MM-DD'));

const a = moment('2020-03-02').valueOf();
console.log(a);


console.log(moment().hour(0)
.minute(0)
.second(0)
.millisecond(0)
.valueOf());