const _ = require('lodash');

const a = _.unionBy([1,2, 3], [1,2]);

const b = _.intersection([1,2,3], [1,2]);

console.log(_.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x'));

console.log(a);
console.log(b);

