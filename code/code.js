/**
 * 新增KWSPGLB中记录
 * @param mx 单条明细
 * @param cjr 创建人
 */
service.createKWSPGLB = co.wrap(function*(mx, cjr, t) {
  // const spfl = yield models.SPSPFLB.findOne({where: {SPID: mx.SPID}});
  // if (spfl.length === 0) {
  //   throw new ServiceError(msgPair.SPFLID_FIND_ERR);
  // }
  // mx.SPFLID = spfl.GUID;
  mx.CJR = cjr;
  mx.CJSJ = Date.now();
  return yield models.KWSPGLB.create(mx, {transaction: t});
});


/**
 * 补充SPCCB相关记录
 * @param result  单条明细在SPCCB中的查询结果，为空，作为判断条件
 * @param ckkw  父级KW信息
 * @param mx 当前明细
 */
service.supplySPCCB = co.wrap(function*(result, ckkw, mx, t) {
  mx.CKJXSID = mx.JXSID;
  const arrOfCreate = [];
  while (!result) {
    if (ckkw.FJKWID && ckkw.FJKWID !== 0) {
      // mx.KWID = ckkw.GUID;
      // mx.FJKWID = ckkw.FJKWID;
      // mx.CKID = mx.FJCKID = ckkw.CKID;
      arrOfCreate.push(Object.assign({}, mx, {KWID: ckkw.GUID, FJKWID: ckkw.FJKWID, CKID: ckkw.CKID, FJCKID: ckkw.CKID}));
      //yield service.createSPCCB(mx, t);
      result = yield service.findSPCCB(0, mx, ckkw.FJKWID, t);
      ckkw = yield service.findKW(ckkw.FJKWID, ckkw.JXSID);
    } else if (ckkw.FJKWID === 0) {
      // mx.KWID = ckkw.GUID;
      // mx.FJKWID = 0;
      // mx.FJCKID = mx.CKID = ckkw.CKID;
      // yield service.createSPCCB(mx, t);
      arrOfCreate.push(Object.assign({}, mx, {KWID: ckkw.GUID, FJKWID: 0, CKID: ckkw.CKID, FJCKID: ckkw.CKID}));
      result = yield service.findSPCCB(1, mx, ckkw.CKID, t);
      ckkw = yield service.findCK(ckkw.CKID, ckkw.JXSID);
    } else {
      // mx.KWID = 0;
      // mx.CKID = ckkw.GUID;
      // mx.FJCKID = ckkw.FJCKID;
      delete mx['FJKWID'];
      //yield service.createSPCCB(mx, t);
      arrOfCreate.push(Object.assign({}, mx, {KWID: 0, CKID: ckkw.GUID, FJCKID: ckkw.FJCKID}));
      result = yield service.findSPCCB(1, mx, ckkw.FJCKID, t);
      ckkw = yield service.findCK(ckkw.FJCKID, ckkw.JXSID);
      if (ckkw.FJCKID === 0 && !result) {
        // mx.CKID = ckkw.GUID;
        // mx.FJCKID = ckkw.FJCKID;
        // yield service.createSPCCB(mx, t);
        arrOfCreate.push(Object.assign({}, mx, {KWID: 0, CKID: ckkw.GUID, FJCKID: ckkw.FJCKID}));
        result = true;
      }
    }
  }
  yield models.SPCCB.bulkCreate(arrOfCreate, {transaction: t});
  return result;
});


/**
 * 新增一条商品存储表的记录
 * @Param 单条出入库明细， t
 */
service.createSPCCB = co.wrap(function*(mx, t) {
  return yield models.SPCCB.create(mx, {transaction: t});
});


/**
 * 获取商品的商品批号ID和商品ID
 * @Param 出入库明细
 */
service.getSpphidAndSpid = co.wrap(function*(crkmx) {
  const temp = [];
  crkmx.forEach(mx => {
    temp.push(service.findSpphidAndSpid(mx));
  });
  yield temp;
  return crkmx;
});

service.findSpphidAndSpid = co.wrap(function*(mx) {
  const result = yield models.SPPHGLB.findOne({
    attributes: ['GUID', 'SPID'],
    where: {
      SPBH: mx.SPBH,
      SPPH: mx.SPPH
    }
  });
  if (!result) {
    throw new ServiceError(msgPair.SPPH_FIND_ERR);
  }
  mx.SPPHID = result.GUID;
  mx.SPID = result.SPID;
  return mx;
});



/**
 * 优先匹配他人的物权，并给予相应KWID
 * @param mx  当前明细
 * @param crkmx  提交的出入库明细
 * @param ckList 出库商品
 * @param otherJXSID  其他经销商ID
 */
service.giveOtherOwnerAndKW = (mx, crkmx, ckList, otherJXSID) => {
  for (let ck of ckList) {
    if (mx.SPPHID === ck.SPPHID && ck.WQJXSID === otherJXSID) {
      if (ck.SL >= mx.SL) {
        mx.KWID = ck.KWID;
        mx.WQJXSID = ck.WQJXSID;
        break;
      } else {
        ck.ZT = mx.ZT;
        crkmx.push(ck);
        mx.SL -= ck.SL;
      }
    }
  }
};

/**
 * 匹配我的物权和相应KWID
 * @param mx 当前明细
 * @param crkmx 提交的出入库明细
 * @param ckList  出库商品
 * @param myJXSID  我的JXSID
 */
service.giveMyOwnerAndKW = (mx, crkmx, ckList, myJXSID) => {
  for (const ck of ckList) {
    if (mx.SPPHID === ck.SPPHID && ck.WQJXSID === myJXSID) {
      if (ck.SL >= mx.SL) {
        mx.KWID = ck.KWID;
        mx.WQJXSID = ck.WQJXSID;
        break;
      } else {
        ck.ZT = mx.ZT;
        crkmx.push(ck);
        mx.SL -= ck.SL;
      }
    }
  }
};



/**
 * [sortJhd description] 对同一库位下的推荐商品，将效期商品统一排序在非效期商品之前
 * @param  {[type]} jhd [description] 拣货单
 * @return {[type]}     [description]
 */
service.sortJhd = (jhd) => {
  jhd.sort((preVal, val) => {
    if (preVal.KWID === val.KWID && !preVal.YXQZ && val.YXQZ) {
      return 1;
    } else {
      return 0;
    }
  });
  return jhd;
};