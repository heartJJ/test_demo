let math = require('mathjs');

console.log( math.eval('0.1 + 0.2') );


// console.log(  math.chain(0.1).add(0.2) );


console.log( math.format( math.divide(math.bignumber(0.3), math.bignumber(3)) ) );