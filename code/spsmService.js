/**
 * Copyright 2017 by FirstGrid
 * Created by HJJ on 17/4/7.
 */
'use strict';
const models = require('src/models'),
  co = require('co'),
  services = require('src/service/'),
  ServiceError = require('src/common/ServiceError'),
  msgPair = require('src/common/Message'),
  knex = require('src/common/knex-connect'),
  _ = require('lodash'),
  ucc_parse = require('src/plugins/ucc_parse'),
  hibc_parse = require('src/plugins/hibc_parse'),
  service = {};

service.name = 'spsmService';

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
 * 根据条码换取商品信息
 * @param tm 条码 (UCC或HIBC)
 * @return {commodity, batchNumber} 商品包装信息， 商品批号信息
 */
service.getInfoByCode = co.wrap(function*(tm) {
  let detail, flag = 0;
  // 旧版条码解析，仅支持UCC
  if (Object.prototype.toString.call(tm) === '[object Object]') {
    detail = services.ckCheckService.parseSPTM(tm); 
  }
  // 解析条码，获取详情
  if (Object.prototype.toString.call(tm) === '[object Array]') {
    if (tm[0].indexOf('+') !== -1 ) {
      detail = hibc_parse(tm);
      flag = 1;
    } else {
      detail = ucc_parse(tm);
    }
  }
  let sql = knex('SPBZGGB')
    .select('*');
  flag ? sql.where('SPBH', detail.SPBH) : sql.where('UCC', detail.code);
  const commodity = yield sql;
  if (commodity.length === 0) {
    throw new ServiceError(msgPair.SPPPID_FINDBYSPBH_ERR);
  }
  const batchNumber = yield knex('SPPHGLB')
    .select('GUID', 'SCRQ', 'YXQZ', 'SPLX', 'SPPH', 'SPID', 'SPBH')
    .where('SPID', commodity[0].SPID)
    .andWhere('SPPH', detail.SPPH);
  return {commodity, batchNumber};
});

/**
 * 出库校验，商品条码入参
 * @param tm 条码
 * @param kwid 库位ID
 */
service.checkOutCommodityByCode = co.wrap(function*(tm, kwid) {
  const {commodity, batchNumber} = yield service.getInfoByCode(tm);
  if (batchNumber.length === 0 ) {
    throw new ServiceError(msgPair.SPPH_FIND_ERR);
  }
  const stock = yield knex('KWSPGLB')
    .select('*')
    .where('SL', '>=', commodity[0].SL)
    .andWhere('SPPHID', batchNumber[0].GUID)
    .andWhere('KWID', kwid);
  if (stock.length === 0) {
    throw new ServiceError(msgPair.SP_CHECK_ERR);
  }
  return {
    KWSPGLB: {
      SPPHID: stock.SPPHID,
      SL: commodity[0].SL,
      SPID: commodity[0].SPID
    }
  };
});




module.exports = service;
