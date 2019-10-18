const Knex = require('knex');

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


const createAndInsert = async (trx, arr) => {
  await trx.raw('create temporary table tem_order ( orderId bigint(20) NOT NULL  )');

  await trx('tem_order').insert(arr);

  const datas = await trx('tem_order').select();

  console.log(datas);
};


const main = async () => {
  return await knex.transaction(async trx => {
    const arr = [ { orderId: 1 }, { orderId: 2 } ];

    await createAndInsert(trx, arr);
  });

};


main();