const _ = require('lodash');

let arr = [
  {yxqz:1585380818675, wqjxsid:810000000027,  kcsl:9834},
  {yxqz:1764259200000, wqjxsid:810000000013,  kcsl:2},
  {yxqz:1585380818675, wqjxsid:810000000008,  kcsl:100},
  {yxqz:1585380818675, wqjxsid:810000000013,  kcsl:5},
  {yxqz:1585380818675, wqjxsid:810000000027,  kcsl:5},
  {yxqz:1585380818675, wqjxsid:810000000027,  kcsl:5},
  {yxqz:1585380818675, wqjxsid:810000000013,  kcsl:5},
  {yxqz:1585380818675, wqjxsid:810000000013,  kcsl:3},
  {yxqz:1585380818675, wqjxsid:810000000013,  kcsl:1994},
  {yxqz:1585380818675, wqjxsid:810000000013,  kcsl:2},
  {yxqz:1608932818675, wqjxsid:810000000013,  kcsl:9848},
  {yxqz:1608932818675, wqjxsid:810000000013,  kcsl:1997},
  {yxqz:1608932818675, wqjxsid:810000000008,  kcsl:63},
  {yxqz:1608932818675, wqjxsid:810000000008,  kcsl:2},
  {yxqz:1608932818675, wqjxsid:810000000008,  kcsl:2},
  {yxqz:1638230400000, wqjxsid:810000000008,  kcsl:50},
  {yxqz:1585380818675, wqjxsid:810000000013,  kcsl:2}
];

arr = _.orderBy(arr, ['yxqz', 'kcsl'], ['asc', 'desc']);
console.log(arr);


arr.sort( (p, c) => {
  if (p.yxqz === c.yxqz) {
    let flag = p.wqjxsid !== 810000000013 && c.wqjxsid !== 810000000013 
      || p.wqjxsid === 810000000013 && c.wqjxsid === 810000000013;

    if (flag) {
      return c.kcsl - p.kcsl;
    } 

    return p.wqjxsid === 810000000013 ? -1 :
      c.wqjxsid === 810000000013 ? 1 : 0;
  }

  return p.yxqz - c.yxqz;
  // if (p.yxqz )
  // if (p.yxqz === c.yxqz) {
  //   return p.wqjxsid === 810000000013 ? -1 :
  //     c.wqjxsid === 810000000013 ? 1 : 0;
  // }

});

console.log('------------------------第二次排序');

console.log(arr);

