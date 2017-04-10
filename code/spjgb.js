/**
 * Copyright 2017 by FirstGrid
 * Created by HJJ on 17/4/10.
 * 根据Excel文件中相应授权你内容，创建价格数据
 */

'use strict';

const path = require('path');
require('app-module-path').addPath(path.resolve(__dirname, '../../'));

const co = require('co'),
  models = require('src/models'),
  xlsx =  require('node-xlsx'),
  fs = require('fs'),
  debug = require('debug')('debug');

// 将excel文件列名替换为相应表 字段名
const protoObj = {  
  MCJXSID: '授权经销商ID', 
  MRJXSID: '被授权经销商ID', 
  SXRQ: '开始时间', 
  DJRQ: '结束时间', 
  YWXID: '产品线ID', 
  ZZJGPPID: '品牌ID',
  DDLX: '合同类型'
};

// 用于表示相应字段在 excel每一行中的坐标
const addressObj = {};

// sql语句，用于查询待生成价格 商品的 SPID
const sql = `SELECT s.GUID from 
	spjcxxb s,
	spspflb f,
	spflb sp
WHERE
	zzjgppid = ?
AND s.guid = f.spid
AND f.spflid = sp.guid
AND sp.ywxid = ?
AND NOT EXISTS (
	SELECT
		*
	FROM
		spjgb j
	WHERE
		j.spid = s.guid
	AND j.mcjxsid = ?
	AND mrjxsid = ?
	AND ddlx = ?
	AND sxzt = 1
)`;

/**
 * 读取excel文件
 */
const readFile = () => {
  const dataList = xlsx.parse(fs.readFileSync(`${__dirname}/docker 铺货寄售授权.xlsx`)),
    head = dataList[0].data[0];

  debug(head);

  Object.keys(head).forEach(key => {
    const proto = Object.keys(protoObj).find(val => protoObj[val] === head[key]);
    if (proto) {
      addressObj[proto] = key;
    }
  });  
  debug(addressObj);

  return dataList[0].data.filter( (val, index) => index > 0 && val.length > 0);
};

/**
 * 查询、组装数据，插入商品价格表
 * @param data 从excel文件中读取的单行数据
 */
const queryAndCreateData = co.wrap(function*(data, t) {
  const idList = yield models.sequelize.query(sql, {
    replacements: [
      data[addressObj.ZZJGPPID], 
      data[addressObj.YWXID], 
      data[addressObj.MCJXSID], 
      data[addressObj.MRJXSID], 
      data[addressObj.DDLX]
    ],
    type: models.sequelize.QueryTypes.SELECT,
    transaction: t
  });
  const arr = idList.map(val => {
    return {
      SPID: val.GUID,
      DDLX: data[addressObj.DDLX],
      DJJXSID: data[addressObj.MCJXSID],
      MRJXSID: data[addressObj.MRJXSID],
      MCJXSID: data[addressObj.MCJXSID],
      HBDM: 'CNY',
      JG: 427.35,  // 价格
      SL: 17.00,  // 税率
      SE: 72.65, //
      HSJG: 500.00, // 含税价格
      SXRQ: 1477958400000, // 生效日期
      SXZT: '1', // 生效状态
      DJRQ: 1477958400000, // 定价日期
      CJR: -1,
      CJSJ: Date.now()
    };
  });
  // debug(arr.length);
  // const res = yield models.SPJGB.bulkCreate(arr, {transaction: t});
  // debug(res);
});

/**
 * 根据所提供的excel文件，生成spjgb数据
 */
const createSPJGB = () => {
  return models.sequelize.transaction(t => {

    return co(function*() {
      const dataList = readFile();
      debug('总条数', dataList.length);
      yield dataList.map(data => queryAndCreateData(data, t));
      // debug(dataList[0]);
      // yield queryAndCreateData(dataList[0], t);
    });

  }).then(function (res) {
    debug(res);
    process.exit();
  })
  .catch(function (err) {
    debug(err);
    process.exit();
  });
};

createSPJGB();



