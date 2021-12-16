/**
 * 代码执行需要 babel 转义
 * npx babel ./decorators/d1.js -o ./decorators/d2.js
 */


function testable(target) {
  target.isTestable = true;
}

@testable
class MyClass {};

console.log(MyClass.isTestable);