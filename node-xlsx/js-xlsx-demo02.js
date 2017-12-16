const XLSX = require('xlsx'),
  fs = require('fs');

const res = XLSX.readFile(__dirname +'/test.xlsx', {cellDates: true, dateNF: 15});

// console.log(res.Sheets);

// let obj_csv = XLSX.utils.sheet_to_csv(res.Sheets.sheet1);
// console.log(obj_csv);


// console.log(res.Sheets.Sheet);
// console.log(XLSX.SSF);

// console.log(XLSX.SSF.parse_date_code(res.Sheets.sheet1.A2.v));
// console.log(res);
// console.log(XLSX.utils.sheet_to_json);
// console.log(res.Sheets.sheet1);
//console.log(res.SheetNames);

let obj = XLSX.utils.sheet_to_json(res.Sheets.sheet1, {raw: true, defval: ''});

console.log(obj);



let arr = [ 
  { '品牌': '瑞力',
    '物料号': '61770560',
    '库存数量': 9,
    '商品名称': '脊柱内固定器 钉棒系统 万向螺钉',
    '规格（型号）': '闭口万向螺钉 5.5×60',
    CKID: '900000005127',
    SPID: '810000000353',
    ZZJGPPID: '810000000006 ',
    '安全库存下限': 10,
    '安全库存上限': 20 },
  { '品牌': '瑞力',
    '物料号': '61770550',
    '库存数量': 4,
    '商品名称': '脊柱内固定器 钉棒系统 万向螺钉',
    '规格（型号）': '闭口万向螺钉 5.5×50',
    CKID: '900000005127',
    SPID: '810000000352',
    ZZJGPPID: '810000000006 ',
    '安全库存下限': null,
    '安全库存上限': null },
  { '品牌': '瑞力',
    '物料号': '61770540',
    '安全库存下限': null,
    '安全库存上限': null,
    '库存数量': 0,
    '商品名称': '脊柱内固定器 钉棒系统 万向螺钉',
    '规格（型号）': '闭口万向螺钉 5.5×40',
    CKID: '900000005127',
    SPID: '810000000351',
    ZZJGPPID: '810000000006 ' },
  { '品牌': '瑞力',
    '物料号': '61770060',
    '安全库存下限': null,
    '安全库存上限': null,
    '库存数量': 0,
    '商品名称': '脊柱内固定器 钉棒系统 连接器',
    '规格（型号）': '5.5连接头 60mm',
    CKID: '900000005127',
    SPID: '810000000350',
    ZZJGPPID: '810000000006 ' } 
];


let sheet = XLSX.utils.json_to_sheet(arr);

// console.log(sheet);

// sheet['!cols'] = [
//   {}, {}, {}, {}, {}, {}, {},
//   {hidden: true}, {hidden: true}, {hidden: true}
// ];

// sheet['!merges'] = [
//   {s: {c: 0, r: 0}, e: {c: 1, r: 1}}
// ];

// sheet['!protect'] = {
//   objects: true
//   // password: '123456'
// };

const workSheet = {
  SheetNames: ['aaa'],
  Sheets: {aaa : sheet}
};




// console.log(workSheet);

let str = XLSX.write(workSheet, {
  bookType: 'xlsx',
  bookSST: false,
  type: 'binary'
});

// console.log(str);

let buffer = new Buffer(str, 'binary');



// console.log(typeof buffer);

// let result = XLSX.read(buffer);

// console.log(XLSX.utils.sheet_to_json(result.Sheets.aaa));

fs.writeFileSync(__dirname + '/out.xlsx', buffer,'binary');


// // XLSX.writeFile(workSheet, __dirname + '/out.xlsx');


// const res_out = XLSX.readFile('out.xlsx', {cellDates: true});

// // console.log(res_out);

// console.log(res_out.Sheets.aaa);