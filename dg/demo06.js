const mk = [
  { id: 1, name: '订单管理' }, { id: 2, name: '仓库管理' }
];

const menu = [
  { id: 20000, name: '采购', moduleId: 1, parentId: 0, level: 'root'  },
  { id: 20001, name: '销售', moduleId: 1, parentId: 0, level: 'root'  },
  { id: 20002, name: '仓储流程', moduleId: 2, parentId: 0, level: 'root'  },
  { id: 10000, name: '备货', moduleId: 1, parentId: 20000, level: 'leaf'  },
  { id: 10001, name: '寄售', moduleId: 1, parentId: 20000, level: 'leaf'  },
  { id: 10002, name: '手术', moduleId: 1, parentId: 20001, level: 'leaf'  },
  { id: 10003, name: '拣货', moduleId: 2, parentId: 20002, level: 'leaf'  },
  { id: 10004, name: '出库', moduleId: 2, parentId: 20002, level: 'leaf'  },
  { id: 10005, name: '复核', moduleId: 2, parentId: 0, level: 'leaf'  },
];

const make = (moduleId, parentId = 0) => {
  const child_arr = menu.filter(v =>  v.moduleId === moduleId && v.parentId === parentId);
  
  return child_arr.map(v => {
    return Object.assign(v, { children: make(moduleId, v.id) });
  });
};


const main = () => {
  mk.forEach(v => {
    v.children = make(v.id);
  });

  mk.forEach(v => {
    console.log('------------');
    console.log(v);
    if (v.children.length > 0) {
      v.children.forEach(r => {
        console.log('*************');
        console.log(r);
      });
    }
  });
};

main();