/**
 * deepEqual ，对原始值进行 '===' 比较， 与 JS的 '==' 号有区别，可见下面举例
 * deepStrictEqual， 对原始值进行 '===' 比较, 与 JS 的'===' 号有区别，可见下面举例 
 * 但无法比较 symbol和不可枚举的属性， 例如 Error 即不可枚举，类内部定义的方法也是
 * 
 * assert.notDeepEqual  与 deepEqual相反
 * 
 * assert.equal 相当于 '==' 操作
 * 
 * assert.ok(val, msg); 若不跟 msg，测试 val 是否为true, 0、false等均会 报错
 */
const assert = require('assert');

const obj1 = {
  a : {
    b : 1
  }
};
const obj2 = {
  a : {
    b : 2
  }
};
const obj3 = {
  a : {
    b : 1
  }
};
const obj4 = Object.create(obj1);

assert.deepEqual(obj1, obj1);
// OK, object is equal to itself

assert.deepEqual(obj1, obj2);
// AssertionError: { a: { b: 1 } } deepEqual { a: { b: 2 } }
// values of b are different

assert.deepEqual(obj1, obj3);
// OK, objects are equal

assert.deepEqual(obj1, obj4);
// AssertionError: { a: { b: 1 } } deepEqual {}
// Prototypes are ignored


assert.deepEqual(Error('a'), Error('b'));
// ERROR不可枚举，故检测不出错误

assert.deepStrictEqual({a:1}, {a:'1'});
// AssertionError: { a: 1 } deepStrictEqual { a: '1' }

assert.deepStrictEqual({a:1}, {a:1});
// OK

assert.deepStrictEqual(Error('a'), Error('b'));
// ERROR不可枚举，故检测不出错误