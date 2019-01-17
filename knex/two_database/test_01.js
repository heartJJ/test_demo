const Knex = require('knex');

// const env = process.env.NODE_ENV || 'development';
// const mysql = require(`config`);
// const mysql  = require('src/config/config.json')[env];

const knex1 = Knex({
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


const knex2 = Knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'hjj'
  },
  debug: true,
  useNullAsDefault: true
});


let main = async () => {
    // let a1 = await knex1('test').select();

    // console.log(a1);

    // let a2 = await knex2('test_2').select();

    // console.log(a2);

  let a3 = await knex1.from('test as t')
    .innerJoin('hjj.test_2 as e', 't.name', 'e.name');

  console.log(a3);

  let a4 = await knex2.from('test_2 as t')
    .innerJoin('hanjianjie.test as e', 't.name', 'e.name');

  console.log(a4);
};

main();



// module.exports = knex;