// let a = [{ GYSY: '0',
//   ZTBS: 'E',
//   GUID: 812100000143,
//   FLMC: 'Solera 4.75',
//   FJFL: 0,
//   FJFLMC: '顶级分类',
//   YWXID: '810000000002',
//   SPPPID: '812100000006',
//   CJR: -1,
//   CJSJ: 1500601734312 }];

// let b =  { '商品品牌': '美敦力',
//   '业务线': '脊柱',
//   '商品品牌ID': '812100000006',
//   '业务线ID': '810000000002',
//   '分类1': 'Solera 4.75',
//   '分类2': '螺塞',
//   '分类3': '螺塞',
//   '商品类型(0 商品 1工具)': '0',
//   '商品编号': '5440230',
//   '商品名称': '脊柱内固定系统（商品名：CD Horizon) CD Horizon Spinal System',
//   '产品描述(中文）': '螺塞',
//   '条形码': '00613994955814' };

// const setStr = (str) => {
//   return str.replace(/\s+/g, '').toLowerCase();
// };

// console.log(setStr(a[0].FLMC) === setStr(b['分类1']));
// console.log(a[0].SPPPID == b['商品品牌ID']);
// console.log(a[0].YXWID == b['业务线ID']);



// let parent_class = a.find(row => setStr(row.FLMC) === setStr(b['分类1']) && row.SPPPID == b['商品品牌ID'] && row.YXWID == b['业务线ID']);

// console.log(parent_class);



function stripscript(s) 
{ 
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") ;
  var rs = ''; 
  for (var i = 0; i < s.length; i++) { 
    rs = rs+s.substr(i, 1).replace(pattern, ''); 
  } 
  return rs; 
} 


let str = '刘延行（平台）【平台】{平台}';


console.log(stripscript(str));


const _ = require('lodash');

let arr = [
  {SPID: 100, UCC: '10000'},
  {SPID: 200, UCC: '20000'},
  {SPID: 300, UCC: '10000'}
];


console.log(_.groupBy(arr, x => x.UCC));




const checkRepeatData = (arr, key) => {
  let set = new Set();
  return arr.every(v => {
    if (set.has(v[key])) {
      return false;
    }
    set.add(v[key]);
    return true;
  });
};

let arr1 = [
  {SPPHID: 1, SL: 5},
  {SPPHID: 2, SL: 3},
];


console.log(checkRepeatData(arr1, 'SPPHID'));