const xlsx =  require('node-xlsx'),
  fs = require('fs');

const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/a.xlsx`));
//console.log(workSheetsFromBuffer.toString());

workSheetsFromBuffer.forEach(val => {
  console.log(val);
});