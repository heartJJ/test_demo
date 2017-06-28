const XLSX = require('xlsx');

const arr = [
  {'商品': '商品1', '价格': 100, '日期': new Date()},
  {'商品': '商品2', '价格': 200, '日期': new Date('2017-07-01')}
];

// const test = () => {
//   try {
//     console.log('------');
//     const sheet = XLSX.utils.aoa_to_sheet(arr, {dateDF: 0, cellDates: true});

//     console.log(sheet);

//     XLSX.writeFile(sheet, __dirname + '/out.xlsx');

//     console.log('操作成功');

//   } catch (err) {
//     console.log(err);
//   };
  
// };

// test();

var ws1 = XLSX.utils.aoa_to_sheet([
	"SheetJS".split(""),
	[1,2,3,4,5,6,7],
	[2,3,4,5,6,7,8]
]);

// console.log(ws1);

var ws2 = XLSX.utils.json_to_sheet([
	{S:1,h:2,e:3,e_1:4,t:5,J:6,S_1:7},
	{S:2,h:3,e:4,e_1:5,t:6,J:7,S_1:8}
]);

// console.log(ws2);

const range = {s: {c: 0, r: 0}, e: {c: 1, r: 1}};

const cellRef = XLSX.utils.encode_cell({c: 1, r: 0});

const trans_range = XLSX.utils.encode_range(range);

console.log(cellRef);
console.log(trans_range);


// function encode_row(row) { return "" + (row + 1); }
// function encode_col(col) { var s=""; for(++col; col; col=Math.floor((col-1)/26)) s = String.fromCharCode(((col-1)%26) + 65) + s; return s; }

// function encode_cell(cell) { return encode_col(cell.c) + encode_row(cell.r); }

// function encode_range(cs,ce) {
// 	if(typeof ce === 'undefined' || typeof ce === 'number') {
// 		return encode_range(cs.s, cs.e);
// 	}
// 	if(typeof cs !== 'string') cs = encode_cell((cs));

// 	if(typeof ce !== 'string') ce = encode_cell((ce));
// 	return cs == ce ? cs : cs + ":" + ce;
// }

console.log(encode_range(range));