const _ = require('lodash');

console.log(_.isEmpty(''));

const a = {name: 'abc'};

const b = _.clone(a);
const c = _.cloneDeep(a);

a.name = 'def';

console.log(b, b === a);
console.log(c, c === a);

console.log( _.isNil('1'));