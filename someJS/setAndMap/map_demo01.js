let map = new Map();

let arr = [
  {KWID: 100, WQJXISD: 1000, index: 1},
  {KWID: 100, WQJXSID: 1000, index: 2},
  {KWID: 200, WQJXSID: 2000, index: 1},
  // {KWID: 200, WQJXISD: 2001, index: 1}
];


arr.forEach(val => {
  const flag = map.has(val.KWID);
  if (flag) {
    throw new Error('arr err');
  }
  map.set(val.KWID, val.WQJXISD);

});

console.log(map);
