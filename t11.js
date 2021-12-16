function beforeFunc(target, name, descriptor) {
  const func = descriptor.value;
  const newFunc = function() {
    console.log(`Before calling: ${name}`);
    const result = func.apply(this, arguments);
    return result;
  };
  return {
    ...descriptor,
    value: newFunc
  };
}

function afterFunc(target, name, descriptor) {
  const func = descriptor.value;
  const newFunc = function() {
    const result = func.apply(this, arguments);
    console.log(`After calling: ${name}`);
    return result;
  };
  return {
    ...descriptor,
    value: newFunc
  };
}

class Medium {
  constructor() {
    this.base = 10;
  }

  @afterFunc
  @beforeFunc
  add(a, b){
    console.log('Calculating...');
    return a + b + this.base;
  }
}

// console.log(Country.language);

const m = new Medium();
console.log('Sum: ', m.add(1, 4));
