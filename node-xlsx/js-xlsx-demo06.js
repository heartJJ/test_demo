const XLSX = require('xlsx'),
  fs = require('fs'),
  _ = require('lodash'),
  timezone = new Date().getTimezoneOffset();

const res = XLSX.readFile(`${__dirname}/安全库存模板.xlsx`);

// console.log(res.Sheets['商品品牌表']);

let sheet_name = res.SheetNames[0],
  data_arr = XLSX.utils.sheet_to_json(res.Sheets[sheet_name]);

  console.log(data_arr);