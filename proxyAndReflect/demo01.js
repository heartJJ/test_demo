class Test {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static add() {
    return this.x + this.y;
  }
}


const t = new Test(1, 2);
const p = new Proxy(t, {
  get: function(target, propKey, receiver) {
    console.log('22222');
    console.log(target, propKey, receiver);
  }
});
console.log(t.x);
