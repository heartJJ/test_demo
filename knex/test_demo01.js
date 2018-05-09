const knex = require('./knex-connect'),
  debug = require('debug')('debug');

// 自动commit
knex.transaction(trx => {
  return trx.insert({name: 'b',age: 11}, 'a')
    .into('test')
    .then(a => {
      debug('插入成功，GUID为', a);
      // let b;
      // debug(b.c);
    });
})
.then( () => {
  debug('操作成功');
  process.exit();
})
.catch( (err) => {
  debug(err);
  process.exit();
});



