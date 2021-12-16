const { Parser } = require('flora-sql-parser');
const parser = new Parser();
const ast = parser.parse('UPDATE `ckb` set `id` = 18 where exists ( select * from kwb where ckb.sid = kwb.sid )');
const toSQL = require('flora-sql-parser').util.astToSQL;


const a = {
  type: 'select',
  where: ast.where,
  from: [{ db: null, table: ast.table, as : null }],
  columns: '*'
};


console.log(toSQL(a));


// const ast1 = parser.parse('select * from t where id = 1 and age between 18 and 20 ');
// console.log(ast1);
