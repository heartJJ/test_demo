console.log(process.NODE_ENV);



const head = [ 'name', 'age', 'sex'];


const arr = [
  {name: 'aaa', age: 11},
  {name: 'bbb', age: 22},
  {name: 'ccc', age: 33}
];

const res = arr.map(val => Object.keys(val).map(key => val[key]));

console.log([head].concat(res));