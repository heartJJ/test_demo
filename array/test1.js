const a = [].find(val => val === 1);
const b = a ? 10 : 0;
console.log(b);

const c = [].filter(val => val === 1);
const d = c.map(val => val.a);
console.log(c);
console.log(d);