const { Parser } = require('node-sql-parser/build/mysql');
const parser = new Parser();
// opt is optional
const ast = parser.astify('update tests set b = case id when 10 then b + 1 when 163 then b + 5 where id in (10, 163)');

console.log(ast);

const sql = parser.sqlify(ast);

console.log(sql); // SELECT * FROM `t`