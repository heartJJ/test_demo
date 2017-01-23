const _ = require('lodash');
const a = [
  {SPBH: '10000', SPPH: '123123', KWID: 100, YXQZ: '100000', SCRQ: null},
  {SPBH: '20000', SPPH: '223123', KWID: 101, YXQZ: '200000', SCRQ: null},
  {SPBH: '10000', SPPH: null, KWID: 100, YXQZ: '100001', SCRQ: null},
  {SPBH: '10000', SPPH: '123124', KWID: 100, YXQZ: '100002', SCRQ: null},
];

const res = _.orderBy(a, ['SPBH', 'SPPH'], ['asc', 'asc']);

// res.sort( (preV, curV) => preV.KWID - curV.KWID);

// res.sort( (preV, curV) => {
//   if (preV.KWID === curV.KWID && !preV.YXQZ && curV.YXQZ) {
//       return 1;
//     } else {
//       return 0;
//     }
// });
console.log(a);
console.log(res);



