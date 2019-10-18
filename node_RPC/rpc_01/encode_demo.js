// 编码

const encode = () => {

  const payload = {
    service: 'com.alipay.nodejs.HelloService:1.0',
    methodName: 'plus',
    args: [ 1, 2 ],
  };
  const body = new Buffer(JSON.stringify(payload));
  
  const header = new Buffer(10);
  header[0] = 0;
  header.writeInt32BE(1000, 1);
  header[5] = 1; // codec => 1 代表是 JSON 序列化
  header.writeInt32BE(body.length, 6);
  
  return Buffer.concat([header, body], 10 + body.length);
  
};

const decode = (buf) => {
  console.log(buf.toString());

  const type = buf[0]; // => 0 (request)
  const requestId = buf.readInt32BE(1); // => 1000
  const codec = buf[5];
  const bodyLength = buf.readInt32BE(6);

  const body = buf.slice(10, 10 + bodyLength);
  const payload = JSON.parse(body);

  console.log(type, requestId, codec, bodyLength, payload);

  const a = { name: 'aaa' };
  const b = { ...a };
};

const buf = encode();
decode(buf);

