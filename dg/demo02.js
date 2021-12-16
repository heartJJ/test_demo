let start_arr = [ 
  { parent: 810000000013,
    is_full: true,
    name: '浙江扛把子医院',
    id: 900000000115 },
  { parent: 810000000013,
    is_full: true,
    name: '浙江省第二医院',
    id: 810000000027 } 
];


let department_arr =  [
  { id: 900000000056, name: '测试部', parent: 0, belong: 810000000027 },
  { id: 900000000079, name: '骨科', parent: 0, belong: 810000000027 },
  { id: 900000000086,
    name: '脑科',
    parent: 810000000027,
    belong: 810000000027 },
  { id: 900000000087,
    name: '付费',
    parent: 810000000027,
    belong: 810000000027 },
  { id: 900000000088, name: '内科', parent: 0, belong: 810000000027 },
  { id: 900000000089,
    name: '心血管科',
    parent: 900000000088,
    belong: 810000000027 },
  { id: 900000000090,
    name: 'xxx',
    parent: 900000000089,
    belong: 810000000027 },
  { id: 900000000091,
    name: '脑科',
    parent: 900000000088,
    belong: 810000000027 },
  { id: 900000000092, name: '外科', parent: 0, belong: 810000000027 },
  { id: 900000000093, name: '方法', parent: 0, belong: 810000000027 },
  { id: 900000000094, name: '', parent: 0, belong: 810000000027 },
  { id: 900000000095, name: '儿科', parent: 0, belong: 810000000027 },
  { id: 900000000102, name: '皮肤科', parent: 0, belong: 810000000027 },
  { id: 900000000103, name: '牙科', parent: 0, belong: 810000000027 },
  { id: 900000000155, name: '实施部', parent: 0, belong: 810000000027 },
  { id: 900000004935, name: '骨科', parent: 0, belong: 900000000115 } 
];


let doctor_arr = [ 
  { id: 810000000245,
    name: '孔明',
    parent: 900000000079,
    belong: 810000000027 },
  { id: 810000000246,
    name: '郭涛',
    parent: 900000000079,
    belong: 810000000027 },
  { id: 810000000247,
    name: '林光',
    parent: 900000000079,
    belong: 810000000027 },
  { id: 810000000248,
    name: '李忠',
    parent: 900000000079,
    belong: 810000000027 },
  { id: 810000000249,
    name: '徐英',
    parent: 900000000079,
    belong: 810000000027 },
  { id: 810000000250,
    name: '陆清',
    parent: 900000000079,
    belong: 810000000027 },
  { id: 810000000251,
    name: '叶钢',
    parent: 900000000079,
    belong: 810000000027 },
  { id: 810000000252,
    name: '邓辉',
    parent: 900000000079,
    belong: 810000000027 },
  { id: 810000000253,
    name: '李健',
    parent: 900000000079,
    belong: 810000000027 },
  { id: 810000000254,
    name: '卫青',
    parent: 900000000079,
    belong: 810000000027 },
  { id: 810000000255,
    name: '高斌',
    parent: 900000000079,
    belong: 810000000027 },
  { id: 810000000256,
    name: '葛华',
    parent: 900000000079,
    belong: 810000000027 },
  { id: 900000000584,
    name: '公共账号（勿删）',
    parent: 900000000056,
    belong: 810000000027 },
  { id: 900000000675, name: '老铁', parent: 0, belong: 810000000027 },
  { id: 900000000682,
    name: '付费',
    parent: 900000000056,
    belong: 810000000027 },
  { id: 900000000684,
    name: 'ff ',
    parent: 900000000056,
    belong: 810000000027 },
  { id: 900000000686,
    name: '牙医1',
    parent: 900000000103,
    belong: 810000000027 },
  { id: 900000000687,
    name: '王超',
    parent: 900000000088,
    belong: 810000000027 },
  { id: 900000000759,
    name: '哈哈',
    parent: 900000000056,
    belong: 810000000027 },
  { id: 900000000760,
    name: '付费',
    parent: 900000000056,
    belong: 810000000027 },
  { id: 900000000761,
    name: '11',
    parent: 900000000056,
    belong: 810000000027 },
  { id: 900000003766,
    name: '医生姓名',
    parent: 900000000155,
    belong: 810000000027 },
  { id: 900000003767,
    name: 'AA',
    parent: 900000000155,
    belong: 810000000027 },
  { id: 900000007761,
    name: '骨1',
    parent: 900000004935,
    belong: 900000000115 } 
];


  // 组装部门的树形结构
// const makeDepartmentTree = (start_arr, department_arr, doctor_arr, index = 1) => {
//   let next_arr = [];
//   start_arr.forEach(v => {
//     let child = index === 1 ?
//       department_arr.filter(r => r.belong === v.id && r.parent === 0) :
//       department_arr.filter(r => r.parent === v.id);

//     if (child.length > 0) {
//       v.children = child;
//       next_arr = next_arr.concat(child);
//     } else {
//       v.children = doctor_arr.filter(r => r.parent === v.id);
//     }
//   });

//   if (next_arr.length > 0) {
//     index++;
//     return makeDepartmentTree(next_arr, department_arr, doctor_arr, index);
//   }
// };

const makeDepartmentTree = (start_arr, department_arr, doctor_arr, flag = true) => {
  start_arr.forEach(v => {
    // console.log('---------------------');
    // console.log(true);
    // start_arr.forEach(v => console.log(v));
    let child = flag ?
      department_arr.filter(r => r.belong === v.id && r.parent === 0) :
      department_arr.filter(r => r.parent === v.id);

    if (child.length > 0) {
      v.children = child;
      return makeDepartmentTree(v.children, department_arr, doctor_arr, false);
    } else {
      v.children = doctor_arr.filter(r => r.parent === v.id);
    }
  });
};

makeDepartmentTree(start_arr, department_arr, doctor_arr);



console.log(start_arr);