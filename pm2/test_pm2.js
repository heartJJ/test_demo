const request = require('request'),
  debug = require('debug')('debug');

const getLocal = () => {
  for(let i = 0; i <= 800; i++) {
    // console.log(`这是第${i}次访问`);
    request('http://localhost:3000', (err, res) => {
        if(err) {
          console.log(`第${i}次请求出错`, err);
        } else {
          console.log(`第${i}次请求成功`);
        }
      });
    }
};

getLocal();