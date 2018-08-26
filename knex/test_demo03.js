const knex = require('./knex-connect'),
  debug = require('debug')('debug'),
  {pro} = require('./cluster_demo');

console.log(pro);

const main = async () => {
  await knex('test').insert({name: 'bbb', age: '0'});
  pro(knex);
};

main();