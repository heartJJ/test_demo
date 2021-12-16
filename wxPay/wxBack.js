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

const cipher1 = crypto.createCipher('aes256', newK);
let crypted = cipher1.update(JSON.stringify(notify), 'utf-8', 'hex');
crypted += cipher1.final('hex');
console.log('加密串', crypted);

// 模拟得到req_info
const req_info = Buffer.from(crypted, 'hex').toString('base64');

// 开始解密
const buf = Buffer.from(req_info, 'base64');
const B = buf.toString('hex');

console.log('base解码', B);

const decipher = crypto.createDecipher('aes256', newK); 
console.log('-----------');
let decrypted = decipher.update(B, 'hex', 'utf-8');
decrypted += decipher.final('utf-8');

console.log(JSON.parse(decrypted));


// const unpadding = thing => {
//   const byte = Buffer.alloc(1);
//   const payload = Buffer.from(thing);
//   payload.copy(byte, 0, payload.length - 1);
//   const pad = byte.readUInt8();

//   if (!~~Buffer.compare(Buffer.alloc(pad, pad), payload.slice(-pad))) {
//     return payload.slice(0, -pad);
//   }

//   return payload;
// };