import { dogSay, catSay } from './testEs6Export'; //导出了 export 方法 
import m from './testEs6Export';  //导出了 export default 

import * as testModule from './testEs6Export'; //as 集合成对象导出

dogSay();
catSay();
console.log(m);
testModule.dogSay();
console.log(testModule.m); // undefined , 因为  as 导出是 把 零散的 export 聚集在一起作为一个对象，而export default 是导出为 default属性。
console.log(testModule.default); // 100