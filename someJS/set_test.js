const array = [ {name: 'aa', age: 16}, {name: 'bb', age: 18}];
const result = [];
const set = new Set();
array.forEach(value => set.add(value.age));
console.log(set);
//console.log(set.values());
// for(let value of set.values()){
// 	result.push(value);
// }
// console.log(result);
console.log( [...set] );
console.log( [...array, 'abc', ...set])