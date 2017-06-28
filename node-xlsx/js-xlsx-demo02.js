const XLSX = require('xlsx');

const res = XLSX.readFile('test.xlsx', {cellDates: true});

// let obj_csv = XLSX.utils.sheet_to_csv(res.Sheets.sheet1);
// console.log(obj_csv);


// console.log(res.Sheets.Sheet);
// console.log(XLSX.SSF);

// console.log(XLSX.SSF.parse_date_code(res.Sheets.sheet1.A2.v));
// console.log(res);
// console.log(XLSX.utils.sheet_to_json);
// console.log(res.Sheets.sheet1);

let obj = XLSX.utils.sheet_to_json(res.Sheets.sheet1, {dataDF: 12, cellDates: true});

// console.log(obj);


let sheet = XLSX.utils.json_to_sheet(obj);

// console.log(sheet);

// sheet['!cols'] = [
//   {hidden: true}
// ];

sheet['!merges'] = [
  {s: {c: 0, r: 0}, e: {c: 1, r: 1}}
];

sheet['!protect'] = {
  objects: true,
  password: '123456'
};

const workSheet = {
  SheetNames: ['sheet1'],
  Sheets: {sheet1 : sheet}
};




console.log(workSheet);

XLSX.writeFile(workSheet, __dirname + '/out.xlsx');


const res_out = XLSX.readFile('out.xlsx', {cellDates: true});

console.log(res_out);

console.log(res_out.Sheets.sheet1);