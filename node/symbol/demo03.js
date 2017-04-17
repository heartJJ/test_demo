/**
 * Symbol.for 方法先检测是否存在这个 Symbol值
 * 若存在则返回，不存在，新建并返回， 
 * 且该方法会登记这个值，可供全局搜索， 这一点区别于 直接 Symbol()
 */

var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');

s1 === s2; // true


/**
 *  Symbol.keFor() 方法返回一个已被登记的 Symbol的值
 */
var s1 = Symbol.for('foo');
Symbol.keyFor(s1); // 'foo'

var s2 = Symbol('foo');
Symbol.keyFor(s2); // undefined