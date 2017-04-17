/**
 * Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，
 * 也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
 * 但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，
 * 可以获取指定对象的所有 Symbol 属性名。
 * 
 * Reflect.ownKeys 方法可获取对象所有的属性名，包括常规属性和 Symbol属性
 */

var size = Symbol('size');

class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

var x = new Collection();
Collection.sizeOf(x); // 0

x.add('foo');
Collection.sizeOf(x); // 1

Object.keys(x); // ['0']
Object.getOwnPropertyNames(x); // ['0']
Object.getOwnPropertySymbols(x); // [Symbol(size)]

Reflect.ownKeys(x); // ['0', Symbol(size)]

console.log(x);