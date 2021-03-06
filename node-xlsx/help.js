const XLSX =  require('xlsx');
// const Workbook =  require('./workbook');

const isBoolean = maybeBoolean => typeof maybeBoolean === 'boolean';
const isNumber = maybeNumber => typeof maybeNumber === 'number';
const isString = maybeString => typeof maybeString === 'string';

const originDate = new Date(Date.UTC(1899, 11, 30));

const buildExcelDate = (value, is1904) => {
  const epoch = Date.parse(value + (is1904 ? 1462 : 0));
  return (epoch - originDate) / (864e5);
};

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
      
      // const flag = Object.prototype.toString.call(data[R][C]) === '[object Object]';
      // const cell =  flag ? {v: data[R][C].value} : {v: data[R][C]};
      // const row = flag ? R + data[R][C].row : R;
      // const col = flag ? C + data[R][C].col : C;

      // const cellRef = XLSX.utils.encode_cell({c: col, r: row});
      const cell = {v: data[R][C]};
      const cellRef = XLSX.utils.encode_cell({c: C, r: R});
      if (isNumber(cell.v)) {
        cell.t = 'n';
      } else if (isBoolean(cell.v)) {
        cell.t = 'b';
      } else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.v = buildExcelDate(cell.v);
        cell.z = XLSX.SSF._table[14]; // eslint-disable-line no-underscore-dangle
      } else {
        cell.t = 's';
      }
      workSheet[cellRef] = cell;
    }
  }
  if (range.s.c < 1e7) {
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

// export {buildSheetFromMatrix, isBoolean, isNumber, isString};
const build = (worksheets, options = {}) => {
  const defaults = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  };
  // const workBook = new Workbook();
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

const parse = (mixed, options = {}) => {
  const workSheet = XLSX[isString(mixed) ? 'readFile' : 'read'](mixed, options);
  return Object.keys(workSheet.Sheets).map((name) => {
    const sheet = workSheet.Sheets[name];
    return {name, data: XLSX.utils.sheet_to_json(sheet, {header: 1, raw: true})};
  });
};

module.exports = {
  build,
  parse
};