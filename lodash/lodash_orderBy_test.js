const _ = require('lodash');
// const a = [
//   {SPBH: '10000', SPPH: '123123', KWID: 100, YXQZ: '100000', SCRQ: null},
//   {SPBH: '20000', SPPH: '223123', KWID: 101, YXQZ: '200000', SCRQ: null},
//   {SPBH: '10000', SPPH: null, KWID: 100, YXQZ: '100001', SCRQ: null},
//   {SPBH: '10000', SPPH: '123124', KWID: 100, YXQZ: '100002', SCRQ: null},
// ];

// const res = _.orderBy(a, ['SPBH', 'SPPH'], ['asc', 'asc']);

// res.sort( (preV, curV) => preV.KWID - curV.KWID);

// res.sort( (preV, curV) => {
//   if (preV.KWID === curV.KWID && !preV.YXQZ && curV.YXQZ) {
//       return 1;
//     } else {
//       return 0;
//     }
// });

const arr = [
  { 
    GUID: 4,
    SPID: 1,
    DDLX: '0',
    DJJXSID: null,
    MRJXSID: 1000,
    MCJXSID: 3000,
    HBDM: null,
    JG: 600,
    SL: 0,
    SE: 0,
    HSJG: 0,
    SXRQ: 1488407208985,
    DJRQ: null,
    CJR: null,
    CJSJ: 0,
    ZTBS: 'E',
    SXZT: '1' 
  },
  { 
    GUID: 5,
    SPID: 1,
    DDLX: '0',
    DJJXSID: null,
    MRJXSID: 1000,
    MCJXSID: 3000,
    HBDM: null,
    JG: 700,
    SL: 0,
    SE: 0,
    HSJG: 0,
    SXRQ: 1488428808985,
    DJRQ: null,
    CJR: null,
    CJSJ: 0,
    ZTBS: 'E',
    SXZT: '0' 
  }
];

const res = _.orderBy(arr, ['SXRQ'], ['DESC']);

// console.log(a);
console.log(res);



