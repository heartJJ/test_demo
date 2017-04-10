/**
 * 商品扫描相关部分代码，改版前
 */


/**
 * 根据不同条件获取 SPBZGGB 信息
 * @param flag 标识
 * @param option 查询条件
 */
service.getSPBZGGB = co.wrap(function*(flag, option) {
  let sql = knex('SPBZGGB')
    .select('*');
  switch(flag) {
    case 0:  // UCC
      sql.where('UCC', option.code);
      break;
    case 1:  // HIBC
      sql.where('SPBH', option.SPBH);
      break;
    case 2:  // 商品具体信息
      sql.where('SPBH', option.SPBH)
        .andWhere('SPPPID', option.SPPPID);
      break;
  }
  const commodity = yield sql;
  if(commodity.length > 1) {
    throw new ServiceError(msgPair.SP_FIND_SL_ERR);
  }
  if(commodity.length === 0) {
    throw new ServiceError(msgPair.SPPPID_FINDBYSPBH_ERR);
  }
  return commodity[0];
});


/**
 * 出库扫描，检验商品是否在库存之中
 * @param tm 条码
 * @param kwid 库位ID
 * @param option {SPBH: <string>, SPPH: <string>, SCRQ: <bigint>, YXQZ: <bigint>}
 */
service.checkKCSP = co.wrap(function*(tm, kwid, option) {
  let spph;
  if(!_.isNil(tm)){
    spph = yield service.getSPPHID(tm);
    const kc = yield models.KWSPGLB.findOne({
      attributes: ['SPPHID'],
      where: {
        SL: {$gte: spph.SL},
        SPPHID: spph.GUID,
        KWID: kwid
      }
    });
    if (!kc) {
      throw new ServiceError(msgPair.SP_CHECK_ERR);
    }
    return {KWSPGLB: {SPPHID: kc.SPPHID, SL: spph.SL, SPID: spph.SPID}};
  } 
  return yield service.checkCommodityOfCk(kwid, option);
});

/**
 * 通过UCC码，换算出SPID，SPPHID及相关信息
 * @param tm 商品条码
 * @param ckrk 出库入库
 * @param ddlx 订单类型
 */
service.getSPPHID = co.wrap(function* (tm, ckrk, ddlx, cjr, transaction = null) {
  let detail, flag = 0; 

  // 解析条码，获取详情
  if(Object.prototype.toString.call(tm) === '[object Array]') {
    if (tm[0].indexOf('+') !== -1) {
      detail =  hibc_parse(tm);
      flag = 1;
    } else {
      detail = ucc_parse(tm);
    } 
  }
  
  if(Object.prototype.toString.call(tm) === '[object Object]') {
    detail = services.ckCheckService.parseSPTM(tm);
  }
  if(!_.isUndefined(detail.error)) {
    throw new ServiceError(msgPair.CODE_FORMAT_ERR);
  }

  // 获取商品包装规格信息及批号信息
  const spbh = yield service.getSPBZGGB(flag, detail); 
  let spphid = yield models.SPPHGLB.findOne({
    where: {SPID: spbh.SPID, SPPH: detail.SPPH},
    attributes: [ 'GUID', 'SCRQ', 'YXQZ', 'SPLX', 'SPPH', 'SPID', 'SPBH']
  });
  if (_.isNil(spphid)) {
    if(ckrk === '1' && ddlx === '1') { //备货入库，查找不到商品则新增
      const res = yield service.createSPPHGLB(detail, cjr, spbh.SPID, transaction);
      spphid = {
        GUID: res.GUID,
        SCRQ: res.SCRQ,
        YXQZ: res.YXQZ,
        SPPH: res.SPPH,
        SPID: res.SPID,
        SPLX: res.SPLX
      };
    } else {
      throw new ServiceError(msgPair.SPPH_FIND_ERR);
    }
  } else {
    spphid = spphid.get({'plain': true});
  }
  return Object.assign(spphid, {SL: spbh.SL, SPPPID: spbh.SPPPID});
});

/**
 * 出库扫描，根据提供的参数进行查询，无法精确定位则自动匹配一个批号返回
 * @param kwid 库位ID
 * @param option 入参
 */
service.checkCommodityOfCk = co.wrap(function*(kwid, option) {
  const commodity = yield service.getSPBZGGB(2, option);
  let sql = knex.select('t1.SPPHID', 't2.SPID')
    .from('KWSPGLB as t1')
    .innerJoin('SPPHGLB as t2', 't1.SPPHID', 't2.GUID')
    .where('t1.KWID', kwid)
    .andWhere('t2.SPID', commodity.SPID)
    .orderBy('t2.YXQZ', 'ASC')
    .orderBy('t2.SCRQ', 'ASC')
    .orderBy('t1.SL', 'ASC');
  if(!_.isUndefined(option.SCRQ)) {
    sql = sql.where('t2.SCRQ', option.SCRQ);
  }
  if(!_.isUndefined(option.YXQZ)) {
    sql = sql.where('t2.YXQZ', option.YXQZ);
  }
  if(!_.isUndefined(option.SPPH)) {
    sql = sql.where('t2.SPPH', option.SPPH);
  }
  const res = yield sql;
  if(res.length === 0) {
    throw new ServiceError(msgPair.SPPH_FIND_ERR);
  }
  return {KWSPGLB: Object.assign(res[0], {SL: commodity.SL})};
});


/**
 * 新建SPPHGLB记录
 * @param option {SPBH: <string>, SPPH: <string>, SCRQ: <bigint>, YXQZ: <bigint>}
 * @param spid 商品ID
 */
service.createSPPHGLB = co.wrap(function*(option, cjr, spid, transaction = null) {
  let commodity = yield models.SPJCXXB.findById(spid);
  commodity = commodity.get({'plain': true});
  delete commodity['GUID'];
  return yield models.SPPHGLB.create(
    Object.assign(commodity, {YXQZ: option.YXQZ, SCRQ: option.SCRQ, SPID: spid, SPPH: option.SPPH, CJR: cjr}),
    {transaction: transaction}
  );
});

/**
 * 入库扫描检验，提交的商品是否在本次物流发货的商品之内
 * @param jxsid 经销商ID
 * @param tm 条码
 * @param option {
 *    SPBH: <string>, SPPH: <string>, SCRQ: <bigint>, YXQZ: <bigint>
 *    WLDH: ,string>, ddid: <bigint>, ddlx: <string>
 *    }
 * @param cjr 创建人
 */
service.checkSpOfWl = co.wrap(function*(jxsid, tm, option, cjr, t) {
  let spph, mxList;
  const sql = knex.select('c.SPID', 'c.SPPHID')
    .sum('c.SL as SL')
    .from('WLDB as w')
    .innerJoin('CRKMXB as c', 'w.CRKID', 'c.CRKID')
    .where('c.CKRK', '0')
    .andWhere('w.MDJXSID', jxsid)
    .andWhere('w.DDID', option.DDID)
    .andWhere('w.WLDH', option.WLDH)
    .groupBy('c.SPID', 'c.SPPHID');
  if(!_.isNil(tm)){
    [spph, mxList] = yield [
      service.getSPPHID(tm, '1', option.DDLX, cjr, t),
      sql
    ];
  } else {
    [spph, mxList] = yield [
      service.checkCommodityOfRk(option, cjr, t),
      sql
    ];
  }
  let mx ;
  if(!_.isNil(mxList[0].SPPHID) && mxList[0].SPPHID !== ''){
    mx = mxList.find(mx => mx.SPPHID === spph.GUID);
  } else {
    mx = mxList.find(mx => mx.SPID === spph.SPID);
  }
  if (_.isUndefined(mx)) {
    throw new ServiceError(msgPair.RKSP_CHECK_ERR);
  }
  if (mx.SL < spph.SL) {
    throw new ServiceError(msgPair.RKSP_CHECK_SL_ERR);
  }
  spph.SPPHID = spph.GUID;
  delete spph['GUID'];
  return {KWSPGLB: spph};
});

/**
 * 入库扫描，根据提供的参数查询商品
 * 若无批号，为备货订单，则新建一条批号
 * @param ddlx 订单类型
 * @param cjr 创建人
 * @param option 入参
 */
service.checkCommodityOfRk = co.wrap(function*(option, cjr, t) {
  const commodity = yield service.getSPBZGGB(2, option);
  let sql = knex('SPPHGLB')
    .select('GUID', 'SPID', 'SPBH', 'SPPH', 'YXQZ', 'SCRQ', 'SPLX')
    .where('SPID', commodity.SPID)
    .andWhere('SPPH', option.SPPH);
  if(!_.isUndefined(option.SCRQ)) {
    sql = sql.where('SCRQ', option.SCRQ);
  }
  if(!_.isUndefined(option.YXQZ)) {
    sql = sql.where('YXQZ', option.YXQZ);
  }
  const res = yield sql;
  if(res.length === 0) {
    if(option.DDLX === '1') {
      const batch = yield service.createSPPHGLB(option, cjr, commodity.SPID, t);
      res.push({GUID: batch.GUID, SCRQ: batch.SCRQ, YXQZ: batch.YXQZ, SPPH: batch.SPPH, SPID: batch.SPID, SPBH: batch.SPBH});
    } else {
      throw new ServiceError(msgPair.SPPH_FIND_ERR);
    }
  }
  return Object.assign(res[0], {SL: commodity.SL, SPPPID: commodity.SPPPID});
});

/**
 * 术后回收扫描检验，提交的商品是否在发货的商品范围之内
 * @param jxsid 经销商ID
 * @param tm 条码
 * @param option {
 *    SPBH: <string>, SPPH: <string>, SCRQ: <bigint>, YXQZ: <bigint>
 *    WLDH: ,string>, ddid: <bigint>, ddlx: <string>
 *    }
 */
service.checkSpOfFh = co.wrap(function*(jxsid, tm, option) {
  const [spph, mxList] = yield [
    service.getSPPHID(tm),
    knex.select('m.SPPHID')
    .sum('m.SL as SL')
    .from('CRKDB as c')
    .innerJoin('CRKMXB as m', 'c.GUID', 'm.CRKID')
    .where('c.FHZT', '1')
    .andWhere('c.JXSID', jxsid)
    .andWhere('c.DDID', option.DDID)
    .groupBy('m.SPPHID')
  ];
  const mx = mxList.find(mx => mx.SPPHID === spph.GUID);
  if (_.isUndefined(mx)) {
    throw new ServiceError(msgPair.HSSP_CHECK_ERR);
  }
  return {KWSPGLB: {SPPHID: mx.SPPHID, SL: spph.SL}};
});