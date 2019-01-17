const Knex = require('knex');
const debug = require('debug');

const knex = Knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    // database: 'hanjianjie'
  },
  debug: true,
  useNullAsDefault: true
});


let main = async () => {
  // let a1 = await knex.raw('SELECT * from hjj.test_2 t , hanjianjie.test e where t.name = e.name');

  let a2 = await knex.from('hjj.test_2 as t')
    .innerJoin('hanjianjie.test as e', 't.name', 'e.name');

  console.log(a2);
  
  let a3 = await knex('test').select(); // No database selected

  console.log(a3);
  
};

main();


