const xlsx = require('xlsx');

// let buffer = new Buffer('sdasdadasdasdads');
fs = require('fs');

// let buffer = fs.readFileSync(`${__dirname}/credit.xlsx`);

let res = xlsx.readFile(`${__dirname}/上海迈凯商品基础信息无史塞克 171221.xlsx`);

//let res = xlsx.read(buffer);
console.log(res.SheetNames);

console.log(res.Sheets[res.SheetNames[0]]);

const worksheet = res.Sheets[res.SheetNames[0]];

 // 返回 'A1:B20'
 // 返回 range 对象，{ s: { r: 0, c: 0}, e: { r: 100, c: 2 } }

// 获取合并过的单元格
// worksheet['!merges'] // 返回一个包含 range 对象的列表，[ {s: { r: 0, c: 0 }, c: { r: 2, c: 1 } } ]


console.log(worksheet['!ref']);

console.log(worksheet['!range']);
