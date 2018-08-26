/**
 * 在游览器中，函数对象和普通对象均存在 _proto_属性， 函数对象存在prototype
 * 在node环境下，执行结果为下列代码所示
 */


let a = {};
let b = function() {};
let c = () => {};

console.log(a._proto_); // undefined
 
console.log(a.prototype); // undefined

console.log(b._proto_);// undefine

console.log(b.prototype); // {}

console.log(c._proto_);// undefined

console.log(c.prototype);// undefined


