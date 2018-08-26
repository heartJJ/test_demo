/**
 * constructor为默认方法，默认返回this
 */
class test {

  // constructor() {

  // }

  print () {
    console.log('123');
  }
};

console.log(typeof test); // 类本质上还是一个function

console.log(typeof test.prototype.constructor); // function

console.log(test.prototype.constructor === test); // true
