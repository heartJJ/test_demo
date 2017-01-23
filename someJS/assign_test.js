const a = {
  name: 'bob',
  age: 22,
  sex: 'male'
};

const b = Object.assign({}, a, {sex: 'female'});
console.log(b);
console.log(a);

const c = Object.assign(a, {sex: 'female'});



console.log(c);
console.log(a);