const XLSX = require('xlsx'),
  fs = require('fs'),
  _ = require('lodash'),
  timezone = new Date().getTimezoneOffset();

const res = XLSX.readFile(`${__dirname}/江苏永康&武汉敦行-汇总数据（柳）.xlsx`);

// console.log(res.Sheets);

// Object.keys(res.Sheets).forEach(key => console.log(key));

const a = XLSX.utils.sheet_to_json(res.Sheets['注册证信息'], {cellDates: true});

// console.log(a)

// a.forEach(val => {
//   if (typeof val['注册证批准日期'] !== 'number' || typeof val['注册证有效期至'] !== 'number' ) {
//     console.log(_.pick(val, ['商品编码', '注册证编码', '注册证批准日期', '注册证有效期止']));
//   }
// });

const handleDate = (val) => {
  if (typeof val === 'number') {
    let date = new Date(1900, 0, val - timezone/60/24 -1);
    return date.getTime();
  } else if (typeof val === 'string') {
    // console.log(val);
    return new Date(val).getTime() + timezone * 60 * 1000;
  } else {
    debug(val);
    throw new Error('时间格式错误');
  }
};

a.forEach(val => {
  let res1 = handleDate(val['注册证批准日期']);
  let res2 = handleDate(val['注册证有效期至']);
  if ( !res1>0) {
    //console.log(res);
    console.log(_.pick(val, ['商品编码', '注册证编码', '注册证批准日期', '注册证有效期至']));
  }
  if (!res2>0) {
    //console.log(res);
    console.log(_.pick(val, ['商品编码', '注册证编码', '注册证批准日期', '注册证有效期至']));
  }
});

// console.log(a[1991]);

// let res1 = handleDate(a[2000]['注册证批准日期']);

// console.log(res1);

console.log('执行完毕');