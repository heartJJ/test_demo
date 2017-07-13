const xlsx =  require('node-xlsx'),
  fs = require('fs');

const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/江苏永康&武汉敦行-汇总数据(1).xlsx`));
//console.log(workSheetsFromBuffer.toString());
// console.log(workSheetsFromBuffer);
// workSheetsFromBuffer.forEach(val => {
 
//   console.log(val);
// // });
// workSheetsFromBuffer.forEach(val => {
//   console.log('------------------');
//   console.log(val.name, val.data.length);
//   console.log(val.data[0]);
// });

const sheet_data = workSheetsFromBuffer.find(val => val.name === '商品信息');

// console.log(sheet);


// sheet.data.forEach(val => {
  
//   val.forEach(row => {
//     //console.log(typeof row);
//     console.log(row);
//   });
// });

// ret_date=new Date(1900,0,42913-1);

// console.log(ret_date);

// console.log(sheet.data.length);
// console.log(sheet.data[0]);
console.log(sheet_data.length);

const head_arr = sheet_data.data[1],
  data_arr = sheet_data.data.filter( (data, index) => index > 1 && index < 10);

const res = data_arr.map(data => {
  let obj = {};
  head_arr.forEach( (head, index) => obj[head] = data[index]);
  return obj;
});

console.log(res);