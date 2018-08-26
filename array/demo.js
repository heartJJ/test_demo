const a = [
  [ [0,1,2], [3,4,5] ],
  [ [9,8,7], [4,6,5] ]
];

const res = a.reduce( (prev, [x, y]) => {
  return prev.concat(y);
}, []);

console.log(res);

const data = [].reduce( (preV, curV) => preV + curV, 0);

console.log(data);