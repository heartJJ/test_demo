//const xlsx =  require('node-xlsx'),
const XLSX = require('xlsx'),
  fs = require('fs'),
  path = require('path');

const isBoolean = maybeBoolean => typeof maybeBoolean === 'boolean';
const isNumber = maybeNumber => typeof maybeNumber === 'number';
const isString = maybeString => typeof maybeString === 'string';

const buildSheetFromMatrix = (data, options = {}) => {
  const workSheet = {};
  const range = {s: {c: 1e7, r: 1e7}, e: {c: 0, r: 0}};
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      if (data[R][C] === null) {
        continue; // eslint-disable-line
      }
      const cell = {v: data[R][C]};
      const cellRef = XLSX.utils.encode_cell({c: C, r: R});
      if (isNumber(cell.v)) {
        cell.t = 'n';
      } else if (isBoolean(cell.v)) {
        cell.t = 'b';
      } else if (cell.v instanceof Date) {
        // cell.t = 'n';
        // cell.v = buildExcelDate(cell.v);
        // cell.z = XLSX.SSF._table[14]; // eslint-disable-line no-underscore-dangle
        cell.t = 'd';
      } else {
        cell.t = 's';
      }
      workSheet[cellRef] = cell;
    }
  }
  if (range.s.c < 1e7) {
    console.log(range);
    workSheet['!ref'] = XLSX.utils.encode_range(range);
  }
  if (options['!cols']) {
    workSheet['!cols'] = options['!cols'];
  }
  if (options['!merges']) {
    workSheet['!merges'] = options['!merges'];
  }
  return workSheet;
};


const build = (worksheets, options = {}) => {
  const defaults = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  };
  const workBook = {
    SheetNames: [],
    Sheets: {}
  };
  worksheets.forEach((worksheet) => {
    const name = worksheet.name || 'Sheet';
    const data = buildSheetFromMatrix(worksheet.data || [], options);
    workBook.SheetNames.push(name);
    workBook.Sheets[name] = data;
  });
  const excelData = XLSX.write(workBook, Object.assign({}, defaults, options));
  return excelData instanceof Buffer ? excelData : new Buffer(excelData, 'binary');
};


const data = [  
  ['时间', '价格' , '商品'],
  [new Date(), 1000, '商品1'],
  [new Date('2017-06-27'), 2000, '商品2']
];

const buffer = build([
  {name: 'sheet1', data: data}
]);// Returns a buffer


fs.writeFileSync(__dirname + '/test.xlsx', buffer,'binary');


const res = XLSX.readFile('test.xlsx', {cellDates: true});

console.log(res.Sheets.sheet1);