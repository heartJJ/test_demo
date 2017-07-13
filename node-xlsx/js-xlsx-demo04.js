const XLSX = require('xlsx'),
  fs = require('fs'),
  _ = require('lodash');

const res = XLSX.readFile(`${__dirname}/江苏永康&武汉敦行-汇总数据（柳）.xlsx`);

// console.log(res.Sheets);

// console.log(res.Sheets['商品品牌表']);

// Object.keys(res.Sheets).forEach(key => console.log(key));

const setStr = (str) => {
  return str.replace(/\s+/g, '').toLowerCase();
};


const a = XLSX.utils.sheet_to_json(res.Sheets['商品信息']);
a.shift();
// console.log(a[0]);

let map1 = new Map(),
  map2 = new Map(),
  map3 = new Map();

a.forEach(val => {
  let key1 = `${val['商品品牌ID']}${val['业务线ID']}${val['分类1']}`;
  let key2 = `${val['商品品牌ID']}${val['业务线ID']}${val['分类1']}${val['分类2']}`;
  let key3 = `${val['商品品牌ID']}${val['业务线ID']}${val['分类1']}${val['分类2']}${val['分类3']}`;

  map1.set(key1, val);
  map2.set(key2, val);
  map3.set(key3, val);
});

console.log(map1.size);
console.log(map2.size);
console.log(map3.size);
// let set = new Set();


let m1 = new Map();
let m2 = new Map();
let m3 = new Map();

[...map2].forEach( ([key, val]) => {
  let second_key = `${val['商品品牌ID']}${val['业务线ID']}${setStr(val['分类1'])}}${setStr(val['分类2'])}`;
  if (m2.has(second_key)) {
    console.log('------------------');
    console.log(val);
  }
  m2.set(second_key, val);
});

[...map3].forEach( ([key, val]) => {
  let third_key = `${val['商品品牌ID']}${val['业务线ID']}${setStr(val['分类1'])}${setStr(val['分类2'])}${setStr(val['分类3'])}`;
  if (m3.has(third_key)) {
    console.log('**********************');
    console.log(val);
  }
  m3.set(third_key, val);
});


// console.log(a[1]);
// const handleString = (str, val) => {
//   if (!str) {
//     console.log(val);
//   }
//   return str.replace(/\s+/g, '').toLowerCase();
// };


// const arr1 = [],
//   arr2 = [],
//   arr3 = [];

// a.forEach(val => {
//   if ( !arr.find(row => 
//     row['商品品牌ID'] === val['商品品牌ID']
//     && row['业务线ID'] === val['业务线ID']
//     && handleString(row['分类1'], val) === handleString(val['分类1'], val)
//   )) {
//     arr.push(_.pick(val, ['分类1', '商品品牌ID', '业务线ID']));
//   }
// });

// console.log(arr.length);