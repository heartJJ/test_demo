const data = [
  {
    'from': 'D',
    'type': '1',
    'to': 'C',
  },  
  {
    'from': 'C',
    'type': '1',
    'to': 'B',
  }, 
  {
    'from': 'B',
    'type': '1',
    'to': 'A',
  }, 
  {
    'from': 'B',
    'type': '1',
    'to': 'H',
  }, 
  {
    'from': 'H',
    'type': '1',
    'to': 'C',
  }, 
];



let all = [], index = 0, all_set = new Set();
function makeArr (id, o = {}) {
  index++;
  const childs_1 = data.filter(v => v.from === id && v.type === '9' && !all_set.has(v.to)  );
  // const set = new Set(childs_1.map(v => v.to));

  childs_1.forEach(v => all_set.add(v.to) );

  const childs_9 = data.filter(v => v.from === id && v.type === '1' && !all_set.has(v.to) );

  const childs = childs_1.concat(childs_9);

  childs_9.forEach(v => all_set.add(v.to) );


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


makeArr('D');

console.log(all);
