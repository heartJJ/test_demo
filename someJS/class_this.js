class A {
  constructor() {
    this.name = 'father';
  }

  getFatherName () {
    console.log(this.name);
  }
}


class B extends A {
  constructor() {
    super();
    //this.name = 'child';
  }

  getName () {
    console.log(this);
    this.getFatherName();
  }
}

const b = new B();

b.getName();

