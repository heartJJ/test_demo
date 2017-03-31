// var rr=`<td width="78%" bgcolor="#FFFFFF">宁波东方恒晟生物科技有限公司</td><td bgcolor="#FFFFFF">宁波市江东区中兴路717号（18-3）；宁波市江东区百宁街77-79号208室</td>
// <td bgcolor="#FFFFFF">宁波市江东区中兴路717号（18-3）</td><td bgcolor="#FFFFFF">顾浩路</td>`;
// var brr=/<td .* bgcolor="#FFFFFF">(.*?)<\/td>/g;
// let ret;
// while ((ret = brr.exec(rr)) != null) {
//   console.log(ret[1]);
// }



const fs = require('fs'),
  co = require('co'),
  path = require('path');

//  const rs = fs.createReadStream(path.resolve(__dirname, './lodash_test'));

const read = new Promise( (resolve, reject) => {
  fs.readFile(path.resolve(__dirname, './lodash_test.js'), 'utf-8', function (err, data) {
    if (err) {
      console.log(err);
      reject(err);
    } else {
      //console.log(data);
      resolve(data);
    }
  }); 
});

  
const promiseRead = new Promise( (resolve, reject) => {
  setTimeout(function() {
    // resolve(1);
    read.then(val => {
      resolve(val);
    });
  }, 3000);
});


const test = co.wrap(function*(){
  const res = yield promiseRead;
  console.log(res);
});

test();