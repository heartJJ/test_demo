const knex = require('./knex-connect'),
  debug = require('debug')('debug');


// 手动式提交
knex.transaction(function(trx) {
  
  var data = [
    {name: 'cc', age: 20},
    // {name: 'bb', age: 30}
  ];

  knex.insert(data, 'id')
    .into('test')
    .transacting(trx)
    .then(function(ids) {
      trx.commit();
      debug('插入成功，返回结果是', ids);
      // let b;
      // debug(b.c);
    })
    .catch(trx.rollback);
})
.then(function(inserts) {
  debug('执行成功');
  process.exit();
})
.catch(function(error) {
  debug('执行失败');
  process.exit();
});