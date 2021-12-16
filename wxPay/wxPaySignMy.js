const crypto = require('crypto');
const _ = require('lodash');
  
const param = {
  appid: 'wx107ff110054b0719',
  body: '梅之音-保证金',
  mch_id: 1603897246,
  nonce_str: '1add1a30ac87aa2db72f57a2375d8fec',
  notify_url: 'https://api-test.meizhiyin.net/pay/deposit',
  openid: 'oUpF8uMuAJO_M2pxb1Q9zNjWeS6o',
  out_trade_no: 900000000001,
  spbill_create_ip: '14.23.150.211',
  total_fee: 1000,
  trade_type: 'APP',
};

const key = 'nWlmTkVLsmLk0RA6pr2QmZnJtxeT7qEZ';

const sort_param = {};
Object.keys(param).sort().forEach(k => {
  const val = param[k];
  if (!_.isUndefined(val) && !_.isNull(val) && val !== '') {
    sort_param[k] = val;
  }
});

console.log(sort_param);

    // 计算签名
const stringA = Object.keys(sort_param)
        .map(k => `${k}=${param[k]}`)
        .join('&'),
  stringSignTemp = `${stringA}&key=${key}`,
  sign = crypto.createHash('md5').update(stringSignTemp)
        .digest('hex')
        .toUpperCase();
console.log(sign);