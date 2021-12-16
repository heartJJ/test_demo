const crypto = require('crypto');  

const alg = 'des-ecb',  
  autoPad = true,  
  key = Buffer.from('MDMUD174'),  
  plaintext = '[{"startDate":"2019-03-26 00:00:00","endDate":"2019-03-27 00:00:00","deliveryNumber":"","outOrderNo":"","cusCode": "MDMCXXXXX","creditCode": ""}]',
  iv = new Buffer(0);  // 默认值
  
// 加密
let cipher = crypto.createCipheriv(alg, key, iv);  
cipher.setAutoPadding(autoPad);  //default true  
let ciph = cipher.update(plaintext, 'utf8', 'base64');  
ciph += cipher.final('base64');  
console.log('加密后：', ciph);    
  
// 解密
let decipher = crypto.createDecipheriv(alg, key, iv);  
decipher.setAutoPadding(autoPad);  
let txt = decipher.update(ciph, 'base64', 'utf8');  
txt += decipher.final('utf8');  
console.log('解密后：', txt);