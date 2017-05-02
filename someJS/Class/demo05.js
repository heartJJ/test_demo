/**
 * 测试在类的一个方法中，调用另一个方法，需使用this指针
 */

class A {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  print () {
    console.log(this.x);
  }

  myMethod () {
    console.log(this);
    this.print();
  }

}

const a = new A(1, 2);

a.myMethod();