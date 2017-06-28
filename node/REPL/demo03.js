#!/usr/bin/env node

/**
 * 输入时自带换行符，占2个长度
 */
process.stdin.setEncoding('utf8');

console.log('请输入add（增量）或cover（覆盖）来选择更新模式');

process.stdin.on('readable', () => {

  var type = process.stdin.read() ;

  if (Object.prototype.toString.call(type) === '[object String]') {
    type = type.substring(0, type.length -1);
    console.log(type);
    console.log(type.length);
  } // 去除默认带有的换行符

 

  if (type === 'add' || type === 'cover') {
    
    console.log(`只更新单个经销商库存，请输入经销商ID，否则回车，将会操作目前所有经销商的库存`);
    
    var jxsid = process.stdin.read();
    if ( Object.prototype.toString.call(jxsid) === '[object Number]') {
      process.stdin.emit('end');
    } else if (jxsid !== null) {
      console.log('输入经销商ID有误，请重新输入!');
    }


  } else if (type !== null) {
    console.log('输入模式有误,请重新输入!');
  }

});




process.stdin.on('end', () => {
  process.stdout.write('end');
});



