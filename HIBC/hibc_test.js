const hibc_parse = require('./hibc_parse'),
  moment = require('moment'),
  _ = require('lodash'),
  hibc_parse_new = require('./hibc');

var barcode = [
  // '*+H4357142111517*',
  // '*+$12DM116357C*',
  // '*+$$322041712DM116357R*'

  // '+J0146605510316*',
  // '+1821282084452LN*'

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

  //'+H124007711009101/2630463496768K168'
  //'+H124008757048011/2636563558038L16J'
  //'+H124005980047021/2624363445304H16$'

  // '+Z00885836124669/2700120170101J'
  // '+H124657711005101/2800120170201J'
  //'+H124657711006101/2900120170301J'
  // '+H124005980027021/2621263395009G16'
  // '+124005980047021/2621263413483H16'

  // '+J014660551921E',
  // '+191584204623KL'

  // '+j0146605510316',
  // '+1909083914526LX'
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



