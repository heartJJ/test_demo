/**
 * _proto_  属性，
 * 在JS创建对象时（包括普通对象和函数对象）均会内置该属性，用于指向其构造函数的原型对象
 */

 let P = function(){};

 let p1 = new P();


 console.log(P.prototype.constructor === P);
 console.log(p1._proto_ === P.prototype); // node 环境下为false, 因p1无 _proto_ 属性
 console.log(p1.constructor === P);

