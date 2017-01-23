var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic', value: 10 },
  { name: 'Zeros', value: 37 }
];

// items.sort(function(a, b) {
//   var nameA = a.name;
//   var nameB = b.name;
//   if (nameA < nameB) {
//     return -1;
//   }
//   if (nameA > nameB) {
//     return 1;
//   }

//   // names must be equal
//   return 0;
// });

// console.log(items);


//const a = items.reduce( (preV, curV) => preV.value + curV.value, 0);

const b = items.reduce( function(preV, curV) {
  console.log(preV);
  console.log(curV);
  return preV + curV.value;
}, 0);
//console.log(a);
console.log(b);

const c = items.filter(val => val.name === 'aaa');
console.log(c);

const d = items.find(val =>val.name == 'aaa');
console.log(d);