// service.createTZMX = (options, btzrArr, t)=> {
//   return co(function *() {
//     let retmk=yield models.MKB.findOne({where: {GUID: options.MKID}});
//     let retmkyw=yield models.MKYWB.findOne({where:{GUID:options.MKYWID}});
//     let tznr=`${retmk.MKMC}>${retmkyw.YWMC}:${options.TZNR}`;
//     if(tznr.length<=600){//通知内容不能超过600字符
//       let now = Date.now();
//       return btzrArr.map(btzr => {
//         return models.TZMXB.create(Object.assign(options, {BTZR: btzr, CJSJ: now,TZNR:tznr}), {transaction: t});
//       });
//     }
//     else {
//       throw new ServiceError(msgCode.TZMX_NOT_ERR);
//     }
//   });
// };

service.createTZMX = co.wrap(function*(options, btzrArr, t) {
  const [mkmc, mkywmc] = yield [
    models.MKB.findOne({where: {GUID: options.MKID}}),
    models.MKYWB.findOne({where:{GUID:options.MKYWID}})
  ];
  let msg = `${mkmc}>`;
  switch (options.MKYWID) {
    case '10100': msg = yield service.handleKCPD(options.MKYWDXID, msg, mkywmc); break;
    case '10101': msg = yield service.handlePDSY(options.MKYWDXID, msg, mkywmc); break;
    default: msg = service.handleOrder(options, msg, mkywmc); break;
  }
  msg = options.TZNR === '' ? msg += '请悉知' :  msg += `${options.TZNR}`;
  // options.TZNR = msg;
  // if (options.TZNR.length > 600) {//通知内容不能超过600字符
  //   throw new ServiceError(msgCode.TZMX_NOT_ERR);
  // }
  // return btzrArr.map(btzr => {
  //   return models.TZMXB.create(Object.assign(options, {BTZR: btzr, CJSJ: now,TZNR:tznr}), {transaction: t});
  // });
  
});

service.handleKCPD = co.wrap(function*(mkywdxid, msg, mkywmc) {
  const res = yield knex.select('t3.CKMC')
    .from('PDSYB as t1')
    .leftJoin('KCPDB as t2', 't1.KCPDID', 't2.GUID')
    .leftJoin('CKB as t3', 't2.PDCK', 't3.GUID')
    .where('t1.GUID', mkywdxid);
  return msg + `,[${res[0].CKMC}仓库已完成"${mkywmc}",`;
});

service.handlePDSY = co.wrap(function*(mkywdxid, msg, mkywmc) {
  const res = yield knex('CKB')
    .select('CKMC')
    .where('GUID', mkywdxid);
  return msg + `,[${res[0].CKMC}仓库已完成"${mkywmc}",`;
});

service.handleOrder = (options, msg, mkywmc) => {
  msg += `,[${options.MKYWDXID}]订单已完成"${mkywmc}",`;
  const res = [10007, 10008, 10018, 10019, 10020].find(val => val === options.MKYWID);
  if (res) {
    msg += '等待您的审核,';
  }
  return msg;
};