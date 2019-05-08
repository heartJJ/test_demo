// const assert = require('assert');
const crypto = require('crypto');
const moment = require('moment');
const nodeRsa = require('node-rsa');
const _ = require('lodash');
const appId = 'MDMUD174';
// const platformCode = appId.substring(appId.length - 4, appId.length);
const privateKey = 'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAIolMvoad+rMjIsRN6K1LMEyREmBXTj0z2q9FdGy9p4kYKS66wE+AkpKkCK3MYJ57Lp0gLFh7Wz+0vFfB1P4PqxZRCCG9/yzcfDgliDTFCWJqLjXMZ6hLXQnOwEKJGHuHaI3q52hVPK31OKR9eWQjeodypY4sSTt9EuPaazOqkPDAgMBAAECgYBBdODTquj5I1TQrCbNfMUpAbVjkt1mGHGTZObKxt6eDiSQyVSC8SvKocvr9xuJdFYb/wnfgsQqKhAveFSTkAO5mMQymSWDsdb7+ZjK+4jHObyAWkL8RGMQPX5+bLl2ov967EhSKNibo/TKKGSvLrBeN8xnHmpqrCG4irbTpcqCEQJBANRwoBpo/wK5X+VkOtGRYnXndOflmcVpYuSjknVeCr1Fyz5BrTyPv+CiI8PylM6qKFRkGf9lIWF0jrjUVqIlM4kCQQCmeLUy+TdBSjSxhT1/F9kTehYRN9VYa5RoqhSayzW1Tme5ToQVPh38qdyMJzaUZzU1jEBmGTa7KjNusJaUNg3rAkBgdhtcopxYYk/22wISMo+gtc5RleGyz92Fr/hKrr71noFg7XV58FPR7g2LZdTH2l+hoipj20nC9KfxqQkFaxrxAkAy9GeiPp4nIeuXGs2EBWywhYITqx9mfSdkEgtUhjbeVC1zjxDm36iWGfgj/iy6qAylY1Si67zQ9U3g57RvkUwZAkAP0Zs7X4XEjwKxKjUGrTEoqrdpPpEuhOQD2kylgxwJdPFm6xIEY3lqlz8aK6wIE015c3Uvu2EnZqw+RGnHTW3Y';
const encode3Des = ({ content, alg = 'des-ecb', autoPad = true, iv = null }) => {
  const key = new Buffer(appId);
  iv = new Buffer(iv ? iv : 0);
  const cipher = crypto.createCipheriv(alg, key, iv);
  cipher.setAutoPadding(autoPad);  //default true  
  let ciph = cipher.update(content, 'utf8', 'base64');//此处 hex 存疑 待验证
  ciph += cipher.final('base64');
  return ciph;
};
// const getSerialNo = (platformCode) => {
//   const time = moment().format('YYYYMMDDHHmmss');
//   return platformCode + time + randomUuid();
// };
// const randomUuid = () => {
//   let str = '',
//     arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
//     // 随机产生
//   for (let i = 0; i < 8; i++) {
//     pos = Math.round(Math.random() * (arr.length - 1));
//     str += arr[pos];
//   }
//   return str;
// };
const putPairsSequenceAndTogether = (param) => {
  const keyArr = Object.keys(param).sort();
  let result = '';
  _.each(keyArr, key => {
    result += key + '=' + param[key] + '&';
  });
  return result.substring(0, result.length - 1);
};
const buildSign = (content, privateKey) => {
  // console.log(privateKey);
  console.log(content);
    // content = content.split('').map(s => s.charCodeAt(0))
  const buffer = Buffer.from(content);
  const key = new nodeRsa();
  key.setOptions({ b: 1024, signingScheme: 'sha1' });//配置密钥长度，并设置签名方法
  key.importKey(`-----BEGIN PRIVATE KEY-----${privateKey}-----END PRIVATE KEY-----`, 'pkcs8-private');//导入密钥并设定格式
  const signature = key.sign(buffer).toString('base64');
    // const sign = crypto.createSign('RSA-SHA1')
    // sign.update(new Buffer(content))
    // const signature = sign.sign(`-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`,'base64')
  return signature;
};
/**
 * 
 * @param {string} cotent 
 * @param {string} privateKey 私钥
 */
const sign = (content, privateKey) => {
  const param = {
    appId, signType: 'RSA', format: 'JSON', timestamp: '1553655442687', version: '1.0', serialNo: 'D17420190327212906dC5qdKga',
    bizContent: encode3Des({ content })
  };
  Object.assign(param, { sign: buildSign(putPairsSequenceAndTogether(param), privateKey) });
  return param;
};
const content = '[{"startDate":"2019-03-26 12:00:00","endDate":"2019-03-27 12:00:00"}]';
console.log(sign(content, privateKey));