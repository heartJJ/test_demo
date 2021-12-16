const js2xmlparser = require('js2xmlparser');

const obj = {
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
  sign: '50A4CFFE79E5659AB17C8A3866F50E1A'
};





console.log(js2xmlparser.parse('xml', obj));