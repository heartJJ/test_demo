// var rr=`<td width="78%" bgcolor="#FFFFFF">宁波东方恒晟生物科技有限公司</td><td bgcolor="#FFFFFF">宁波市江东区中兴路717号（18-3）；宁波市江东区百宁街77-79号208室</td>
// <td bgcolor="#FFFFFF">宁波市江东区中兴路717号（18-3）</td><td bgcolor="#FFFFFF">顾浩路</td>`;
// var brr=/<td .* bgcolor="#FFFFFF">(.*?)<\/td>/g;
// let ret;
// while ((ret = brr.exec(rr)) != null) {
//   console.log(ret[1]);
// }


// const arr = [1, 2, 3];

// arr.forEach(val => console.log(val));

// const a = (val = true) => {
//   console.log(val);
// };  


// a(undefined);

// a(false);


// const a = [1,2,3];

// const b = [];

// console.log(a.concat(b));

// console.log(b.concat(a));

const set = new Set();

for (let i = 0; i < 5; i++) {
  set.add(i);
}

const arr1 = [...set];

console.log(arr1);

const arr2 = [
  { DDID: 10000, DDLX: '2'},
  { DDID: 10000, DDLX: '1'},
  { DDID: 20000, DDLX: '2'}
];

const set2 = new Set();
arr2.forEach(val => set2.add(val.DDID));

console.log(set2);

const flag = [].every(val => val === 1);
console.log(flag);


const arr_map = [1, 2, 3].map(val => {
  val = val +1;
});

console.log(arr_map.length);