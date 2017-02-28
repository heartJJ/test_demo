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
const buffer = xlsx.build([{name: 'mySheetName', data: data}]), // Returns a buffer
  year = new Date().getFullYear(), 
  month = new Date().getMonth() + 1,
  date = new Date().getDate(),
  filePath = path.resolve(__dirname, `${year}-${month}-${date}.xlsx`);
fs.writeFileSync(filePath, buffer,'binary');
