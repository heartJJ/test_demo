/**
 * 静态方法，不能被实例继承，但可被 子类继承
 */

class A {
  constructor() {
    this.x = 1;
    this.y = 2;
  }

  static method () {
    console.log('这是父类的静态方法');
  }

}

class B extends A {
  constructor() {
    super();
    this.z = 3;
  }

  static print() {
    super.method();
  }
}

A.method(); // 这是父类的静态方法
const a = new A();
// a.method(); // Error
B.method(); // 这是父类的静态方法
B.print(); // 这是父类的静态方法


/**
 * 绑定在 this 上的为实例属性，绑定在类上的为 静态属性
 * 类 内部只有静态方法，不能有静态属性
 */

A.staticProto = 1; // 设置静态属性的唯一写法