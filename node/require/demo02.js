const d = require('./demo01');

delete require.cache[require.resolve('lodash')];

console.table(require.cache);


console.log('-------------------------------');

const _ = require('lodash');




// console.log('----------------------');

console.log(_.specail());
