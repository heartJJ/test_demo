const xlsx =  require('node-xlsx'),
  fs = require('fs');

const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/aaa.csv`));
//console.log(workSheetsFromBuffer.toString());
console.log(workSheetsFromBuffer);
workSheetsFromBuffer.forEach(val => {
 
  console.log(val);
});