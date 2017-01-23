// const array = [1,2,3];
// const obj = { name: '213'};
// const result = array.map(value => Object.assign({}, obj, {age: value}));

// console.log(result);

const a = [
	{name: 'abc', age: 11},
	{name: 'bbc', age: 12}
];

const b = a.map(obj => Object.assign({}, obj));
console.log(b);

// const keys = Object.keys(b);
// const array = keys.map(key => b[key]);
// console.log(array);
a.forEach(obj => {
	obj.sex = 'male';
});
// console.log(array);
// console.log(a);
 console.log(b);

// ['a', 'b', 'c'].reduce( (previousValue, currentValue, currentIndex) => {
//   console.log(previousValue);
//   console.log(currentValue);
//   console.log(currentIndex);
//   //return previousValue + currentValue;
// }, 1);

