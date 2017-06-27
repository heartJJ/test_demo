const XLSX = require('xlsx');

const res = XLSX.readFile('瑞力_定价 (1).xlsx');

console.log(res.Sheets.Sheet);