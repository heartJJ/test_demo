const xlsx =  require('node-xlsx'),
  fs = require('fs'),
  path = require('path'),
  debug = require('debug')('debug');
// Or var xlsx = require('node-xlsx').default;

const data = [
  ['三亚湾', '海棠湾', '亚龙湾', '空搜', '大东海'], 
  ['三亚京润珍珠主题酒店', '三亚国光豪生度假酒店', '三亚泥宿艺术酒店', '三亚海豚湾主题酒店', '三亚半山半岛洲际度假酒店'], 
  ['三亚国光豪生度假酒店', '三亚京润珍珠主题酒店', '三亚海豚湾主题酒店', '三亚泥宿艺术酒店', '三亚半山半岛洲际度假酒店'], 
  ['三亚京润珍珠主题酒店', '三亚国光豪生度假酒店', '三亚泥宿艺术酒店', '三亚海豚湾主题酒店', '三亚半山半岛洲际度假酒店']
];

const other_data = [  
  ['aaaa', 'vbvvv' , 'vvvv'],
  ['bbbb', 'aaaasa', 'vvvv']
];

const buffer = xlsx.build([
  {name: 'sheet1', data: data},
  {name: '中文', data: other_data}
]);// Returns a buffer
  // year = new Date().getFullYear(), 
  // month = new Date().getMonth() + 1,
  // date = new Date().getDate(),
  // filePath = path.resolve(__dirname, `${year}-${month}-${date}.xlsx`);

// const other_buffer = xlsx.build([]);
// const length1 = buffer.length;
// const length2 = other_buffer.length;

// const data_buffer = Buffer.concat([buffer, other_buffer], length1 + length2);


fs.writeFileSync(__dirname + '/test.xlsx', buffer,'binary');
