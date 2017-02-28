/**
 * 术后回收转续流程获取拣货推荐单
 * @param ddid 订单ID
 * @param crkid 出入库ID
 * @param idList 库位ID数组
 * @param jxsid 经销商ID
 * @type {Function}
 */
service.getJhdOfHs = co.wrap(function*(ddid, crkid, kwidList, jxsid) {
  const [spList, dd, mxList] = yield [
    knex.select('s.SPBH', 'd.SPID')
      .sum('d.SL as SL')
      .from('DDSPGLB as d')
      .leftJoin('SPJCXXB as s', 'd.SPID', 's.GUID')
      .where('d.DDID',ddid)
      .groupBy('d.SPID'),
    models.DDB.findOne({
      attributes: ['CKCK'],
      where: {
        GUID: ddid,
        SHJXSID: jxsid
      }
    }),
    models.CRKMXB.findAll({
      attributes: ['SPID', 'SPBH', [models.sequelize.fn('sum', models.sequelize.col('SL')), 'SL']],
      where: {
        CRKID: {$in: crkid},
        ZT: '2'
      },
      group: ['SPID']
    })
  ];
  if (spList.length === 0) {
    throw new ServiceError(msgPair.DDSP_FIND_ERR);
  }
  return yield service.produceJHD(spList, mxList, dd, kwidList, jxsid);
});



/**
 * 查询指定仓库下所有库位（最底层库位）
 * @param ckck   [description] 出库仓库
 * @param jxsid  [description] 经销商ID
 */
service.getKWList = co.wrap(function*(ckck, jxsid) {
  if (!ckck) {
    throw new ServiceError(msgPair.CKCK_FIND_ERR);
  }
  const sql = `SELECT GUID FROM CKB WHERE FIND_IN_SET(GUID, getCKList(${ckck})) AND JXSID = ${jxsid} `,
    ckList = yield models.sequelize.query(sql, {
      type: models.sequelize.QueryTypes.SELECT
    }),
    ckidList = ckList.map(ck => ck.GUID),
    kwList = yield models.KWB.findAll({
      attributes: ['GUID'],
      where: {
        CKID: {$in: ckidList},
        JXSID: jxsid
      }
    });
  if (kwList.length === 0) {
    throw new ServiceError(msgPair.KWLIST_FINDBYCKID_ERR);
  }
  const kwidList = kwList.map(kw => kw.GUID),
    fjkwList = yield models.KWB.findAll({attributes: ['FJKWID'], where: {GUID: {$in: kwidList}}}),
    fjkwidList = fjkwList.map(kw => kw.FJKWID);
  return _.difference(kwidList, fjkwidList);
});

/**
 * 获取符合条件的库位（指定仓库下的底层库位，且排除掉正在盘存的部分）
 * @param ckck 出库仓库（指定仓库）
 * @param jxsid 经销商ID
 */
service.getKWUndisabld = co.wrap(function* (ckck, jxsid) {
  const [kwList, disabledKw] = yield [
      service.getKWList(ckck, jxsid),
      models.KWB.findAll({where: {KWZT: '0'}})
    ],
    disabledId = disabledKw.map(val => val.GUID);
  return _.difference(kwList, disabledId);
});


/**
 * 关联SPCCB和KWSPGLB，查询有效期商品相应的库存详情
 * @param  kwList        [description] 库位ID数组
 * @param  spidList      [description] 订单订购商品数组
 * @param  kcList        [description] 库存详情
 */
service.getKCWithEffectiveDate = co.wrap(function*(kwList, spidList, kcList, jxsid) {
  if (spidList.length !== 0) { //效期商品
    const date = Date.now();
    kcList = yield knex.select('t1.KWID', 't1.SPBH', 't1.SPPH', 't1.YXQZ', 't1.SCRQ', 't1.CKJXSID as JXSID', 't1.WQJXSID', 't2.SPLX', 't1.SPID', 't1.SPPHID')
      .sum('t1.SL as KCSL')
      .from('SPCCB as t1')
      .leftJoin('SPJCXXB as t2', 't1.SPID', 't2.GUID')
      .where('t1.CKJXSID', jxsid)
      .andWhere('t1.YXQZ', '>', date)
      .andWhere('t1.SL', '>', 0)
      .whereIn('t1.SPID', spidList)
      .whereIn('t1.KWID', kwList)
      .groupBy('t1.KWID', 't1.SPPHID', 't1.WQJXSID')
      .orderBy('YXQZ', 'ASC')
      .orderBy('KCSL', 'DESC');
  }
  return kcList;
});


/**
 * 关联SPCCB和KWSPGLB，查询非效期商品相应的库存详情
 * @param  kwList        [description] 库位ID数组
 * @param  spidList      [description] 订单订购商品
 * @param  kcList        [description] 库存详情
 * @param  kwidList      [description] 用户选择的优先库位
 */
service.getKCWithoutEffectiveDate = co.wrap(function*(kwList, spidList, kcList, kwidList, jxsid) {
  if (spidList.length !== 0) { //非效期商品
    let result = yield knex.select('t1.KWID', 't1.SPBH', 't1.SPPH', 't1.YXQZ', 't1.SCRQ', 't1.CKJXSID as JXSID', 't1.WQJXSID', 't2.SPLX', 't1.SPID', 't1.SPPHID')
      .sum('t1.SL as KCSL')
      .from('SPCCB as t1')
      .leftJoin('SPJCXXB as t2', 't1.SPID', 't2.GUID')
      .where('t1.CKJXSID', jxsid)
      .andWhere('t1.SL', '>', 0)
      .whereIn('t1.SPID', spidList)
      .whereIn('t1.KWID', kwList)
      .andWhere(function() {
        this.where('t1.YXQZ', 0).orWhere('t1.YXQZ', null);
      })
      .groupBy('t1.KWID', 't1.SPPHID', 't1.WQJXSID')
      .orderBy('SCRQ', 'ASC')
      .orderBy('KCSL', 'DESC');
    if (kwidList.length > 0) {
      result = service.sortSuggestionOfChose(result, kwidList);
    }
    result.forEach(sp => kcList.push(sp));
  }
  return kcList;
});


/**
 * 根据选择的优先库位，将获取的库存详情进行排序
 * @param options [description] 库存详情
 * @param idList  [description] 优先库位数组
 */
service.sortSuggestionOfChose = (options, idList) => {
  idList.forEach(id => {
    options.sort((preVal, val) => {
      if (preVal.KWID === id) {
        return -1;
      } else if (val.KWID === id) {
        return 1;
      } else {
        return 0;
      }
    });
  });
  return options;
};


/**
 * 产生拣货推荐单
 * @param spList 订单订购的商品列表
 * @param mxList 已拣货商品
 * @param dd 订单信息
 * @param kwidList 库位ID数组
 * @param jxsid 经销商ID
 * @type {Function}
 */
service.produceJHD = co.wrap(function*(spList, mxList, dd, kwidList, jxsid, flag = false) {
  let jhd = [],
    kcList = [];
  const spidList = spList.map(sp => {
    const mx = mxList.find(mx => sp.SPID === mx.SPID);
    if (mx) {
      sp.SL -= mx.SL;
    }
    return sp.SPID;
  });
  const kwList = yield service.getKWUndisabld(dd.CKCK, jxsid);
  if(flag) {
    return {SP: spList, SPID: spidList, KW: kwList};
  }
  kcList = yield service.getKCWithEffectiveDate(kwList, spidList, kcList, jxsid);
  kcList = yield service.getKCWithoutEffectiveDate(kwList, spidList, kcList, kwidList, jxsid);
  if (kcList.length === 0) {
    throw new ServiceError(msgPair.KCLIST_FINDBYCKCK_ERR);
  }
  spList.forEach(sp => service.choseSP(sp, kcList, jhd));
  if(jhd.length === 0) {
    throw new ServiceError(msgPair.JHTJDB_CREATE_ERR);
  }
  const temp = [];
  jhd.forEach(value => temp.push(services.crkdshbService.findPath(value)));
  yield temp;
  let jhdOfOrder = _.orderBy(jhd, ['KWID', 'YXQZ', 'SCRQ', 'SPBH', 'SPPH'], ['asc', 'asc', 'asc', 'asc', 'asc']);
  if (kwidList.length !== 0) {
    jhdOfOrder = service.sortSuggestionOfChose(jhdOfOrder, kwidList);
  }
  return {JHTJDB: jhdOfOrder};
});




/**
 * 获取单个仓库的库存情况，按SPBH分类
 * @param fjckid 父级仓库ID
 * @param ckid 仓库ID
 * @param jxsid 经销商ID
 */
service.getSPCCB = co.wrap(function*(ckid, jxsid) {
  return yield models.SPCCB.findAll({
    attributes: ['CKID', 'SPID', [models.sequelize.fn('sum', models.sequelize.col('SL')), 'SL']],
    where: {
      CKID: ckid,
      CKJXSID: jxsid,
      KWID: 0,
      SL: {$ne: 0}
    },
    group: ['SPID']
  });
});


