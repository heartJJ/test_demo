const data = [ 
  ['aa', 'bb', 'cc'],
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [10, 11, 12]
];

const xlsx =  require('node-xlsx'),
  fs = require('fs'),
  path = require('path'),
  debug = require('debug')('debug');

let option = {};
option['!cols'] = [
  {},
  {hidden: true},
  {}
];

option['!merges'] = [
  {s: {c: 0, r: 0}, e: {c: 1, r: 1}}
];

console.log(option);

const buffer = xlsx.build([
  {name: 'sheet1', data: data}
], option);

fs.writeFileSync(__dirname + '/test-demo01.xlsx', buffer,'binary');
