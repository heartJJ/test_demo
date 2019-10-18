const knex = require('./knex-connect'),
  debug = require('debug')('debug');


const test = async () => {
  try {
    const trx = await knex.transaction();
    await trx('user').insert({ username: 'liu', password: '124' });
    trx.commit;
  } catch (error) {
    console.log(error);
    trx.rollback;
  } 
};

test();