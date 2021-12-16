class A {
  static getInstance() {
    if (!A._instance) {
      A._instance = new A();
    }
    return A._instance;
  }

  async print (ms, val) {
    await new Promise( (resolve, reject) => {
      setTimeout(resolve, ms);
    });
    console.log(`执行完毕，输出${val}`);
    console.log(Date.now());
    return val;
  };  
}


const main = async () => {

  for (let i = 0; i < 10; i++) {
    await A.getInstance().print(5000, i);
    // console.log(res1);
    await A.getInstance().print(1000, i + 100);
  }


 
};


main();