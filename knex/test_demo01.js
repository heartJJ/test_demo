const knex = require('./knex-connect'),
  debug = require('debug')('debug');

// 自动commit
// knex.transaction(trx => {
//   return trx.insert({name: 'b',age: 11}, 'a')
//     .into('test')
//     .then(a => {
//       debug('插入成功，GUID为', a);
//       // let b;
//       // debug(b.c);
//     });
// })
// .then( () => {
//   debug('操作成功');
//   process.exit();
// })
// .catch( (err) => {
//   debug(err);
//   process.exit();
// });



const batchs = async () => {
  const arr = [
    { name: '11', age: 11 },
    { name: '12', age: 12 },
    { name: '13', age: 13 },
    { name: '14', age: 14 },
  ];

  const result = await knex.batchInsert('test', arr, 2);

  console.log(result);
};


const trx_func = async () => {
  
  const arr = [
    { name: '20', age: 21 },
    { name: '21', age: 21 },
  ];

  for (let o of arr) {
    await trx('test').insert(o);
  }

  trx.commit();

};

// batchs();

// trx_func();

console.log(new Date().getTimezoneOffset());
console.log(new Date(new Date().toLocaleDateString()).getTime());