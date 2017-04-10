const SimpleMsg = require('./SimpleMsg');

let msg = new SimpleMsg({Message: '测试'});

console.log(msg);

msg.setCode(1);

console.log(msg.getCode());

console.log(msg.getMsg());