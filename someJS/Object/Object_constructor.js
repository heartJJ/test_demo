/**
 * 任何对象都有 constructor
 */

var o = {};
o.constructor === Object; // true

var o = new Object;
o.constructor === Object; //true

var a = [];
a.constructor === Array; // true

var a = new Array;
a.constructor === Array; //true

var n = new Number(3);
n.constructor === Number; // true


function Tree(name) {
  this.name = name;
}

var theTree = new Tree('Redwood');
console.log('theTree.constructor is ' + theTree.constructor);
// theTree.constructor is function Tree(name) { this.name = name;}