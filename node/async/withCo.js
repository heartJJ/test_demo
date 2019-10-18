const co = require('co');

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const fun1 = async () => {
  await fun2();
  console.log('this is fun1');
}

const fun2 = co.wrap(function*() {
  yield timeout(1000);
  console.log('this is fun2');
  yield timeout(1000);
});


fun1();