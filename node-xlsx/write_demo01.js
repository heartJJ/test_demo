const data =
   [ [ '上海三友医疗器械有限公司' ],
     [ '2017年04月应收账款分析' ],
     [ '黄色区域为有逾期款项', '', '', '', '', '', '', '', '制表日期:2017年05月09日' ],
     [ '代理商名称',
       '信用额度与付款方式',
       '三友销售员',
       '上月结存',
       '本月',
       '', '',
       '应收账款余额',
       '应收账款逾期次数',
       '备注' ],
     [ '', '', '', '', '已发货金额', '退货', '已收款金额' ],
     [ '上海朝贺',
       '30万',
       '李剑',
       '',
       154752,
       0,
       164120,
       '',
       0 ],
     [ '上海觅贺',
       '月结/150万月结/150万',
       '韩  涛',
       '',
       0,
       0,
       2716,
       '',
       [0,1,2,3,] ] ];

const xlsx =  require('node-xlsx'),
  fs = require('fs'),
  path = require('path'),
  debug = require('debug')('debug');


const buffer = xlsx.build([
  {name: 'sheet1', data: data}
]);

fs.writeFileSync(__dirname + '/test-demo01.xlsx', buffer,'binary');
