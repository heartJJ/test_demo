const xlsx =  require('node-xlsx'),
  fs = require('fs');

const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/瑞力_定价 (1).xlsx`));
//console.log(workSheetsFromBuffer.toString());
// console.log(workSheetsFromBuffer);
// workSheetsFromBuffer.forEach(val => {
 
//   console.log(val);
// });


const sheet = workSheetsFromBuffer.find(val => val.name = 'Sheet');

// console.log(sheet);


sheet.data.forEach(val => {
  
  val.forEach(row => {
    //console.log(typeof row);
    console.log(row);
  });
});

ret_date=new Date(1900,0,42913-1);

console.log(ret_date);