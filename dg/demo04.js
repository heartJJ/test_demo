const _ = require('lodash');

const data = [
  {
    'from': 'D',
    'type': '1',
    'to': 'C',
  },  
  {
    'from': 'D',
    'type': '9',
    'to': 'C',
  },  
  {
    'from': 'C',
    'type': '1',
    'to': 'B',
  },
  {
    'from': 'C',
    'type': '9',
    'to': 'B',
  },
  {
    'from': 'C',
    'type': '1',
    'to': 'H',
  },
  {
    'from': 'B',
    'type': '1',
    'to': 'A',
  },
  {
    'from': 'B',
    'type': '9',
    'to': 'A',
  },
  {
    'from': 'H',
    'type': '1',
    'to': 'G',
  },
  {
    'from': 'H',
    'type': '9',
    'to': 'G',
  },
  {
    'from': 'H',
    'type': '9',
    'to': 'I',
  },
  {
    'from': 'G',
    'type': '1',
    'to': 'B',
  },
];





let all = [], index = 0;
// type 的作用是 仅第一次查询时可指定是否特定格式，因最末层可明确是 共享或寄售
function makeArr (id, o = {}, type = 'all') {
  index++;
  // console.log(`第${index}次循环`);
  let childs;
  if ( type === 'all') {
    const childs_1 = data.filter(v => v.from === id && v.type === '9'  );
    const set = new Set(childs_1.map(v => v.to));
  
    const childs_9 = data.filter(v => v.from === id && v.type === '1' && !set.has(v.to) );
    childs = childs_1.concat(childs_9);
  } else {
    childs = data.filter(v => v.from === id && v.type === type );
  }

  if (childs.length > 0) {
    childs.forEach(v => {
      // Object.assign(v, { index: o });
      // makeArr(v.to, v);

      const obj = Object.assign({}, o);
      obj[index] = v;

      // console.log('-------', v, obj);
      makeArr(v.to, obj);

    });
  } else {
    all.push(o);
  }
 
}


makeArr('D', {}, '1');

console.log(all);

// const append = all.filter(v => {
//   const max_key = _.max(Object.keys(v));
//   return v[max_key].to === 'A';
// });


// console.log('-------------');

// console.log(append);