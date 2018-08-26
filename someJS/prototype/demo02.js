/**
 * 原型对象（P.prototype）是 函数（P）的一个实例
 * P 构造函数中 this 即指向 P.prototype ， 因此p1 可使用this 定义的属性或方法
 */

function P(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() { console.log('say name'); } ;
};

/* P.prototype 即为原型对象，默认有constructor（构造函数）属性，该属性是一个指针，指向P */
console.log(P.prototype.constructor === P); // true

/**
 * p1为P的实例，拥有constructor属性。 
 * 可类比为 p1 == P.prototype， 即P在创建时，同时创建了一个实例，并赋予其 constructor 属性
 */

let p1 = new P();
console.log(p1.constructor === P);
console.log(p1.sayName()); // say name


/**
 * 原型对象 P.prototype 是一个 普通对象
 * 只有 Function.prototype 特殊，是原型对象，但是是一个函数对象，却没有 prototype 属性
 */
console.log(P.prototype); // P{}
console.log(typeof P.prototype); //Object
console.log(typeof Function.prototype); // function，这个特殊
console.log(typeof Object.prototype); // Object
console.log(typeof Function.prototype.prototype); //undefined

/* Function.prototype 是一个 “空”函数，因其属性不可枚举，故console.log为空 */

console.log(Function.prototype); // {}

console.log(Object.getOwnPropertyNames(Function.prototype)); // [ 'length','name','arguments','caller','apply','bind','call','toString','constructor' ]