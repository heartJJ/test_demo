// 快捷的拼树形结构的思路

const menu = [
  { id: 20000, name: '采购', moduleId: 1, parentId: 0, level: 'root'  },
  { id: 10000, name: '备货', moduleId: 1, parentId: 20000, level: 'leaf'  },
  { id: 10001, name: '寄售', moduleId: 1, parentId: 20000, level: 'leaf'  },
  { id: 10002, name: '备货采购', moduleId: 1, parentId: 10000, level: 'leaf'  },
  { id: 10003, name: '备货出库', moduleId: 2, parentId: 10000, level: 'leaf'  },
  { id: 10004, name: '备货采购-子级', moduleId: 2, parentId: 10002, level: 'leaf'  },
  { id: 10005, name: '寄售出库', moduleId: 2, parentId: 10001, level: 'leaf'  },
];
const _ = require('lodash');


const group = _.groupBy(menu, 'parentId');

menu.forEach(v => {
  v.children = group[v.id] || [];
});

const start = menu.filter(v => v.parentId === 0);

start.forEach(v => {
  console.log(v);
});