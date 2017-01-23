const request = require('request'),
  config = require('./config.json')['API_2'];

// const option = {
//   url: 'http://jisukdcx.market.alicloudapi.com/express/query?number=3321740147338&type=auto',
//   headers: {
//     "Authorization":"APPCODE ab1df9006c0943a884d824512c7a9d8b"
//   }
// };

// const opt = {
//    url: 'http://ali-deliver.showapi.com/showapi_expInfo?com=auto&nu=533320735209',
//    headers: {
//     "Authorization":"APPCODE ab1df9006c0943a884d824512c7a9d8b"
//   }
// } 


const orderList = [
  '3321740147338', // EMS
  '3321740147338', // 申通
  '533320735209'// 中通
];

const getRes = () => {
  for(let i of orderList) {
    const option = Object.assign({}, config);
    option.url = `${config.url}?nu=${i}&com=auto`;
    // option.url = `${config.url}?number=${i}&type=auto`;
    console.log('起始时间：' + Date.now());
    request(option, (err, res, body) => {
      console.log(err);
      console.log(body);
      console.log('结束时间：' + Date.now());
    });
  }
};


getRes();
