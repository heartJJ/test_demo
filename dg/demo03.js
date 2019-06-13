const data = [
  {
    'area_id': 5,
    'name': '广东省',
    'parent_id': 0,
  },  
  {
    'area_id': 6,
    'name': '广州市',
    'parent_id': 5,
  },
  {
    'area_id': 10,
    'name': '广州市市辖区1',
    'parent_id': 6,
  },
  {
    'area_id': 11,
    'name': '广州市市辖区2',
    'parent_id': 6,
  },
  {
    'area_id': 7,
    'name': '深圳市',
    'parent_id': 5,
  },
  // {
  //   'area_id': 4,
  //   'name': '北京市',
  //   'parent_id': 3,
  // },
  // {
  //   'area_id': 3,
  //   'name': '北京',
  //   'parent_id': 0,
  // },
  // {
  //   'area_id': 2,
  //   'name': '测试子地区',
  //   'parent_id': 1,
  // },
  // {
  //   'area_id': 1,
  //   'name': '测试地区',
  //   'parent_id': 0,
  // }
];

// 知道父级，找子级
function tree(id) {
  const childs = data.filter(v => v.parent_id === id );

  return childs.map(item => {
    return {
      area_id: item.area_id,
      label: item.name,
      children: tree(item.area_id)
    };
  });
}

// 知道子级， 找父级
function remove_tree(id) {
  const parents = data.filter(v => v.area_id === id );

  return parents.map(item => {
    return {
      area_id: item.area_id,
      label: item.name,
      children: remove_tree(item.parent_id)
    };
  });
}

// 子找父，以数组形式保存，便于后续处理。更复杂的数据模拟参见 demo04 和 demo05
let all = [];
function makeArr (id, o = {}) {
  // index++;
  // console.log(`第${index}次循环`);
  const childs = data.filter(v => v.area_id === id );

  if (childs.length > 0) {
    childs.forEach(v => {
      Object.assign(v, { index: o });
      makeArr(v.parent_id, v);
    });
  } else {
    all.push(o);
  }
 
}


function toTreeData(pid){
 
  
  // return tree(pid);  // 第一级节点的父id，是null或者0，视情况传入
  return remove_tree(11);
}


// const result = toTreeData(0);

// result.forEach(v => {
//   console.log(v);
//   if (v.children.length > 0) {
//     v.children.forEach(r => {
//       console.log(r);
//     });
//   }
// });


makeArr(11);

console.log(all);