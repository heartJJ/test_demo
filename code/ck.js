// const arr = [
//   {CKCK: '仓库1', RKCK: '仓库2'}
// ];

// const a = 'CKCK';

// const data = [
//   { name: 'aaa'},
//   { name: 'bbb'}
// ];

// data.forEach(val => {
//   val[a] = arr[0][a];
// });

// console.log(data);


/**
 * 获取出库仓库或者入库仓库
 * @param ddid 订单ID
 * @param options 单条查询到的CRKMX
 */
service.getCK = co.wrap(function*(ddid, options) {
  if (options.CKRK === '1') {
    const dd = yield models.DDB.findOne({
      where: {GUID: ddid},
      include: {
        model: models.CKB,
        as: 'RK',
        attributes: ['CKMC']
      }
    });
    if (!dd.RK) {
      
    }
    options.RKCK = dd.RK.CKMC;
  } else {
    const dd = yield models.DDB.findOne({
      where: {GUID: ddid},
      include: {
        model: models.CKB,
        as: 'CK',
        attributes: ['CKMC']
      }
    });
    if (!dd.CK) {
      
    }
    options.CKCK = dd.CK.CKMC;
  }
  return options;
});