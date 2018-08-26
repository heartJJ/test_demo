const XLSX = require('xlsx'),
  fs = require('fs'),
  _ = require('lodash');

let moment = require('moment');

const excel_data = XLSX.readFile('武汉敦行致远科技有限公司库存信息 (1).xlsx');

let reg = { // 日期格式
  format1: new RegExp('^\\d{4}\\-\\d{1,2}\\-\\d{1,2}$'),
  format2: new RegExp('^\\d{4}\\-\\d{1,2}$'),
  format3: new RegExp('^\\d{4}\\/\\d{1,2}\\/\\d{1,2}$'),
  format4: new RegExp('^\\d{4}\\/\\d{1,2}$')
};


data_arr = XLSX.utils.sheet_to_json(excel_data.Sheets[excel_data.SheetNames[0]]);

const handleDate = (val) => {
  if (!val) {
    return null;
  }

  if (typeof val === 'number') {
    let date = new Date(1900, 0, val - timezone/60/24 -1);
    return date.getTime();
  } 
  
  if (typeof val === 'string') {
    if (reg.format1.test(val)) {
      return new Date(val).getTime();
    }
    if (reg.format2.test(val)) {
      return moment(new Date(val).getTime()).add(1, 'M').add(-1, 'd').valueOf();
    }
    if (reg.format3.test(val) ) {
      return new Date(val).getTime() - timezone * 60 * 1000;
    }
    if (reg.format4.test(val)) {
      return moment(new Date(val).getTime() - timezone * 60 * 1000).add(1, 'M').add(-1, 'd').valueOf();
    }
    return null;
  } 
  
  return parseInt(''); // NAN
  
};

// console.log(data_arr[0]);

// console.log(data_arr[1135]);

// console.log(data_arr[1390]);

// data_arr.forEach(data => {
//   if (!_.isEmpty(data['数量'])) {
//     let n = parseInt(data['数量']);
//     if ( !(n >= 0)) {
//       console.log(data);
//     }
//   }
// });

let res = data_arr.find(v => v['产品编号'] == 'MV+G');

console.log(res);

console.log(handleDate(res['生产日期']));









let a = '2015-02';

let b = '2015-01';

let c = '2015-00';


console.log(moment(new Date(a).getTime()).add(1, 'M').add(-1, 'd').valueOf());


console.log(moment(new Date(b).getTime()).add(1, 'M').add(-1, 'd').valueOf());


console.log(moment(new Date(c).getTime()).add(1, 'M').add(-1, 'd').valueOf());