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
  debug: true,
  useNullAsDefault: true
});

module.exports = knex;