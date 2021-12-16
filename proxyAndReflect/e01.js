

class baseJob {

  async toString() {
    try {
      console.log(this.constructor.name, this.des);
      // console.log(this);
      await this.asyncPrint(1000);
      console.log(3333);
    } catch (error) {
      
    }
  }
}

class T extends baseJob {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.des = 'this is T';
  }

  async parentString() {
    console.log(11111);
    await super.toString();
  }

  asyncPrint(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}

const main = async () => {
  const t1 = new T(1, 2);
  await t1.parentString();
};

main();