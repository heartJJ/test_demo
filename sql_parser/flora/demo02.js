const { Parser } = require('flora-sql-parser');
const parser = new Parser();

const ast1 = parser.parse('update ckb a, kwb b set a.guid = 0 where a.guid = b.ckid and b.guid = 1');

console.log(ast1);