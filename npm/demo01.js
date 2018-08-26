/**
 * 测试npm run 多个脚本报错时的情况
 */

const test = () => {
  try {
    throw new Error('第一个脚本报错');
    console.log('这是第一个脚本');
  } catch(err) {
    throw err;
  } 
  
};

test();