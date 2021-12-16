const crypto = require('crypto');

// key 做md5
let key = '192006250b4c09247ec02edce69f6a2d';
const md5 = crypto.createHash('md5');
const newK = md5.update(key).digest('hex').toLowerCase();
console.log(newK);

// 模拟加密
const notify = {
  return_code: 'SUCCESS', return_msg: 'OK'
};

const iv = '';


// const encrypt = (plaintext, key) => {
//   const payload = this.pkcs7.padding(plaintext);
//   const cipher = crypto.createCipheriv(
//     this.ALGO_AES_256_ECB, key, null
//   ).setAutoPadding(false);

//   return Buffer.concat([
//     cipher.update(payload, this.utf8),
//     cipher.final()
//   ]).toString(this.base64);
// };



const cipher1 = crypto.createCipheriv('aes-256-ecb', newK, iv);
let crypted = cipher1.update(JSON.stringify(notify), 'utf8', 'hex');
crypted += cipher1.final('hex');
console.log('加密串', crypted);

// 模拟得到req_info
const req_info = Buffer.from(crypted).toString('base64');

// 开始解密
const buf = Buffer.from(req_info, 'base64');
const B = buf.toString();

console.log('base解码', B);

const decipher = crypto.createDecipheriv('aes-256-ecb', newK, iv); 
console.log('-----------');
let decrypted = decipher.update(B, 'hex', 'utf8');
decrypted += decipher.final('utf8');

console.log(JSON.parse(decrypted));
