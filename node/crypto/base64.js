const str = 'this is a test for base64';

const b64 = Buffer.from(str).toString('base64');
console.log('转码后', b64);

const str_s = Buffer.from(b64, 'base64').toString('utf-8');
console.log('解码后', str_s);