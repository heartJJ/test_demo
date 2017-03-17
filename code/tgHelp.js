// const js = [
//   { GUID: 10,
//     KWID: 10000,
//     SPBH: '20000',
//     SPPH: '200100',
//     SPID: 2,
//     SPPHID: 2,
//     SPLX: null,
//     WQJXSID: 2000,
//     SL: 5 },
//   { GUID: 11,
//     KWID: 10001,
//     SPBH: '30000',
//     SPPH: '300100',
//     SPID: 3,
//     SPPHID: 4,
//     SPLX: null,
//     WQJXSID: 2000,
//     SL: 5 },
//   { GUID: 12,
//     KWID: 10000,
//     SPBH: '20000',
//     SPPH: '200100',
//     SPID: 2,
//     SPPHID: 2,
//     SPLX: null,
//     WQJXSID: 3000,
//     SL: 5 },
//   { GUID: 13,
//     KWID: 10000,
//     SPBH: '20000',
//     SPPH: '200101',
//     SPID: 2,
//     SPPHID: 3,
//     SPLX: null,
//     WQJXSID: 2000,
//     SL: 5 },
//   { GUID: 14,
//     KWID: 10000,
//     SPBH: '30000',
//     SPPH: '300100',
//     SPID: 3,
//     SPPHID: 4,
//     SPLX: null,
//     WQJXSID: 3000,
//     SL: 5 },
//   { GUID: 15,
//     KWID: 10000,
//     SPBH: '20000',
//     SPPH: '200100',
//     SPID: 2,
//     SPPHID: 2,
//     SPLX: null,
//     WQJXSID: 2000,
//     SL: 5 }
// ];

// const mxWithGroup = [
//   {WQJXSID: 2000},
//   {WQJXSID: 3000}
// ];

const js = [
  { GUID: 19,
    KWID: 10000,
    SPBH: '20000',
    SPPH: '200100',
    SPID: 2,
    SPPHID: 2,
    SPLX: null,
    WQJXSID: 2000,
    SL: 4 },
  { GUID: 20,
    KWID: 10000,
    SPBH: '30000',
    SPPH: '300100',
    SPID: 3,
    SPPHID: 4,
    SPLX: null,
    WQJXSID: 2000,
    SL: 4 }
];

const mxWithGroup = [
  {WQJXSID: 2000}
];

const test = () => {
  mxWithGroup.forEach(mx => {
    mx.SPMX = [];
    const list = js.filter(val => val.WQJXSID === mx.WQJXSID);
    list.forEach(val => {
      const res = mx.SPMX.find(row => row.SPPHID === val.SPPHID && row.KWID === val.KWID);
      if (res) {
        res.SL += val.SL;
      } else {
        delete val.GUID;
        mx.SPMX.push(val);
      }
    });
  });
};

test();

mxWithGroup.forEach(val => console.log(val.SPMX));