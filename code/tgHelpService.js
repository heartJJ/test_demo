/**
 * Copyright 2017 by FirstGrid
 * Created by HJJ on 17/3/10.
 */
'use strict';
const models = require('src/models'),
  co = require('co'),
  services = require('src/service/'),
  ServiceError = require('src/common/ServiceError'),
  msgPair = require('src/common/Message'),
  knex = require('src/common/knex-connect'),
  _ = require('lodash'),
  service = {};

service.name = 'tgHelpService';

/**
 * 备货时，操作出库单，手术时，操作入库单
 * 查找出上述出入库单明细中属于寄售的部分，明确对应的寄售订单
 * @param idList 出入库单GUID组成的数组
 */
service.getOwnerOfCommodity = co.wrap(function*(idList) {
  const arr = [],
    crkd = yield knex('CRKDB')
      .select('*')
      .whereIn('GUID', idList),
    sql = knex('CRKMXB')
      .select('KWID', 'SPID', 'SPPHID', 'SPBH', 'SPPH', 'SPLX', 'JXSID', 'WQJXSID')
      .sum('SL as SL')
      .whereIn('CRKID', idList)
      .andWhereNot('WQJXSID', crkd[0].JXSID)
      .groupBy(['KWID', 'SPPHID']);
  if (crkd[0].CKRK === '1') {
    sql.where('ZT', '3');
  }
  const orderList = yield knex('DDB')
      .select('*')
      .where('CJJXSID', crkd[0].JXSID)
      .whereIn('DDLX', ['0', '5'])
      .andWhere('DDZT', '1')
      .andWhere('ZTBS', 'E');
  const [commodityOfOther, commodityOfCK] = yield [
    sql,
    knex.select('t1.DDID', 't1.JXSID', 't2.SPPHID')
      .sum('SL as SL')
      .from('CRKDB as t1')
      .innerJoin('CRKMXB as t2', 't1.GUID', 't2.JXSID')
      .whereIn('t1.DDID', orderList.map(val => val.GUID))
      .andWhere('t1.CKRK', '0')
      .andWhere('t1.FHZT', '1')
      .groupBy(['t1.DDID', 't1.SPPHID'])
  ];
});

/**
 * 为查询出的寄售商品，匹配相应的寄售订单
 */
service.getOrderOfCommodity = (mx, commodityOfCK) => {
  const list = commodityOfCK(val => val.JXSID === mx.WQJXSID && val.SPPHID === mx.SPPHID);
  if (list.length === 1 && mx.SL <= list[0].SL) {
    mx.DDID = list[0].DDID;
  } else if (list.length > 1) {
    const res = _.orderBy(list, ['SL'], ['desc']);
    
  }
};

module.exports = service;