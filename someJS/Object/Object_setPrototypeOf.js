/**
 * Object.setPrototypeOf = function (obj, proto) {
 *   obj.__proto__ = proto;
 *    return obj;
 * }
 * 
 * 
 * Object.create(A.prototype);  // 等同   B.prototype.__proto__ = A.prototype;
 */


function aa () {
  this.x = 'yes';
}

function bb (y) {
  this.y = y;
}

bb.prototype = new aa();
bb.prototype.constructor = bb();

const b1 = new bb('felis');

console.log(b1.x); // yes

function cc () {
  this.z = 'yes';
}

Object.setPrototypeOf(b1, new cc());

console.log(b1.z); // yes
console.log(bb.constructor); // [Function: Function]