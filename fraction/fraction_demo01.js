const Fraction = require('fraction.js');


let a =  Fraction(1).div(2).add(Fraction(1).div(3)).toFraction(true);

console.log(a);

let b = Fraction(a);

console.log(b);


let c = Fraction([3, 6]);

console.log(c);