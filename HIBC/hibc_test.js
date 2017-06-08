const hibc_parse = require('./hibc_parse'),
  moment = require('moment'),
  _ = require('lodash'),
  hibc_parse_new = require('./hibc');

var barcode = [
  // '*+H4357142111517*',
  // '*+$12DM116357C*',
  // '*+$$322041712DM116357R*'

  '+J0146605510316*',
  '+1821282084452LN*'

  // '*+H435713067141E',
  // '*+$16BM07001ED',
  // '*+$$326020616BM07001ES'

  //'+J123123451/$$1012311234567L'

  // '+H435716552361K',
  // '+$16GM04912KW',
  // '+$$326070516GM04912K8'


  // '+H728716552361P',
  // '+$15FT56024P0',
  // '+$$325070115FT56024PE'
];

const parseTm = () => {
  // const obj = {};
  // barcode.forEach(val => {
  //   const res = hibc_parse(val);
  //   console.log(res);
  //   if(!_.isUndefined(res.error)) {
  //     throw new Error(123);
  //   }
  //   if(res.type === 1 || res.type === 2) {
  //     obj.HIBC = res.labelerId.concat(res.product);
  //     obj.SPBH = res.product;
  //   }
  //   if(res.type === 3) {
  //     obj.SPPH = res.lot;
  //     obj.YXQZ = Date.parse(res.date);
  //   }
  // });
  // console.log(obj);
 // console.log(hibc_parse(barcode));
  
  // hibc_parse(barcode);
  hibc_parse_new(barcode);
};

parseTm();



