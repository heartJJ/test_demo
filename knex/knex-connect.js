const Knex = require('knex');

// const env = process.env.NODE_ENV || 'development';
// const mysql = require(`config`);
// const mysql  = require('src/config/config.json')[env];

const knex = Knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'hanjianjie'
  },
  // debug: true,
  useNullAsDefault: true
});


knex.client.on('query-response', (response, obj, builder) => {
  const sql = obj.bindings.reduce((pre, cur) => {
    pre = pre.replace('?', cur);
    return pre;
  }, obj.sql);

  console.log(sql);
});

module.exports = knex;