/**
 * 返回带sign的json数据：{
 * "appId":"MDMUD001",
 * "format":"JSON",
 * "bizContent":"xrvir5FMz2EqcNozmKAZ0X46kyA0537K",
 * "sign":"J+8zik9gydNrUM/YbZy1VVVvrxlh9/guQWAw6OFvnQrwfHw2b2wCY80ZGG4AmiKBf65/fVS/wqSYUUcGlXKwm/SMSDbOS+XO7nJVjCu8JJAxFcT6Ad2Ac1zByJR20cBQk/g2zEcJr1Q/+FOkFJ1PyOk88nvdrLBJSG27ekf0cJw\u003d",
 * "signType":"RSA",
 * "version":"1.0",
 * "timestamp":"1553599456141",
 * "serialNo":"D00120190326192416Q9l0eG7X"
 * }
 */

// let appId = 'MDMUD001',
//   platformCode = appId.substring(appId.length() - 4, appId.length());

let crypto = require('crypto');  
  
function test_des(param) {  
  let key = new Buffer(param.key);  
  let iv = new Buffer(param.iv ? param.iv : 0);  
  let plaintext = param.plaintext;  
  let alg = param.alg;  
  let autoPad = param.autoPad;  
      
    //encrypt  
  let cipher = crypto.createCipheriv(alg, key, iv);  
  cipher.setAutoPadding(autoPad);  //default true  
  let ciph = cipher.update(plaintext, 'utf8', 'base64');  
  ciph += cipher.final('base64');  
  console.log(alg, ciph);  
  console.log(ciph.length);  
  
    //decrypt  
  // let decipher = crypto.createDecipheriv(alg, key, iv);  
  // cipher.setAutoPadding(autoPad);  
  // let txt = decipher.update(ciph, 'hex', 'utf8');  
  // txt += decipher.final('utf8');      
  // assert.equal(txt, plaintext, 'fail');  
}  

let o = {
  startDate: '2019-03-26 00:00:00',
  endDate: '2019-03-27 00:00:00',
  deliveryNumber: '',
  outOrderNo: '',
  cusCode: 'MDMCXXXXX',
  creditCode: ''
};

// let param = {  
//   alg: 'des-ecb',  
//   autoPad: true,  
//   key: '01234567',  
//   plaintext: '1234567812345678',  
//   iv: null  
// };

let param = {  
  alg: 'des-ecb',  
  autoPad: true,  
  key: 'MDMUD174',  
  plaintext: '[{\"startDate\":\"2019-03-26 00:00:00\",\"endDate\":\"2019-03-27 00:00:00\",\"deliveryNumber\":\"\",\"outOrderNo\":\"\",\"cusCode\": \"MDMCXXXXX\",\"creditCode\": \"\"}]',
  iv: null  
} ;

test_des(param);