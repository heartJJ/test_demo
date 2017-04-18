/**
 * new target:
 * 返回new命令作用于的那个构造函数。
 * 如果构造函数不是通过new命令调用的，new.target会返回undefined，
 */

function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错

/**
 * 作用在类中，返回当前 Class
 */

class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true

/**
 * 用于类继承，限制A不能被实例化，只能继承
 */
class A {
  constructor() {
    if (new.target === A) {
      throw new Error('本类不能实例化');
    }
  }
}

class B extends A {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new A();  // 报错
var y = new B(3, 4);  // 正确