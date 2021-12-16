const arr = [];

for (let i = 0; i <= 10000; i++) {
  const str = i % 2 === 0 ? 'abc' : 'def';
  arr.push(str);
}

const k = 'BC';
const regex = new RegExp(`.*${k}.*`, 'i');

console.time('regex');

let regexCal = 0;
arr.forEach(v => {
  if (regex.test(v)) {
    regexCal++;
  }
});

console.log('regexCal', regexCal);
console.timeEnd('regex');

console.time('indexOf');

let indexCal = 0;
arr.forEach(v => {
  if ( v.toLocaleUpperCase().indexOf(k.toLocaleUpperCase()) !== -1 ) {
    indexCal++;
  }
});
console.log('indexCal', indexCal);
console.timeEnd('indexOf');
