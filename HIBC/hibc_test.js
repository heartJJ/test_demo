const hibc_parse = require('./hibc_parse');
 const moment = require('moment');
  const _ = require('lodash');

var barcode = [
  //  '*+H4357142111517*',
  //  '*+$12DM116357C*',
  // '*+$$322041712DM116357R*'
  //  '+J0146605510316*',
  //  '+1821282084452LN*'
  '*+H435713067141E',
  '*+$16BM07001ED',
  '*+$$326020616BM07001ES'
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
  console.log(hibc_parse(barcode));
};

parseTm();



