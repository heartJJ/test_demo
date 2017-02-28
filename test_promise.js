const co = require('co');

const test_promise = () => {
  return new Promise( (resolve, reject) => {
    reject(123);
  }).catch(err => {
    console.log('出错了');
    throw new Error(345);
  }); 
};

const a = co.wrap(function*() {
  const res = yield test_promise();
  console.log(Object.prototype.toString.call(res));
});

a();
