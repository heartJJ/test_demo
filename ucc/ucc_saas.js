/**
 * UCC解码，待完善
 * 目前 SAAS 实际解析UCC所用文件
 */
const moment = require('moment'),
  debug = require('debug')('debug'),
  _ = require('lodash');

const err = {
  MistakeLengthOfArray:  '条码数组长度有误',
  MistakeLengthOfPackageCode:  '包装代码的长度有误',
  MistakeLengthOfEnsureAI: '定长AI的长度有误', 
  CodeParseFail: '无法解析条码',
  CodeNotComplete: '条码不完整', //无 ‘10’ 和 ‘21’
  MainCodeMiss: '查找不到主码',
  RepeatCode: '重复条码'
};

let isComplete = false;

let code_sp = new Map([
  ['28031497000101', '1230']
]);

/**
 * 补充完整条码，将数组合并成一个字符串
 */
const supplementCode = (tm, obj) => {
  let index;
  if(tm.length === 2) {
    index = tm.findIndex(val => val.length === 13 );
    if (index !== -1) {
      tm[index] = '010'.concat(tm[index]);
    } else {
      index = tm.find(val => val.length === 17 );
      if (index !== -1) tm[index] = '000'.concat(tm[index]);
    }
  }
  if(tm.length > 2) {
    obj.error.push(err.MistakeLengthOfArray);
  }
};

/**
 * 获取包装代码
 */
const getCodeOfPackage = (code, obj) => {
  let key = code.substring(0, 2);
  if(key === '00') {
    if(code.length < 20) {
      obj.error.push(err.MistakeLengthOfPackageCode);
    }
    obj.code = code.substring(2, 20);
    code = code.substring(20);
  } else if(key === '01' || key === '02') {
    if(code.length < 16) {
      obj.error.push(err.MistakeLengthOfPackageCode);
    }
    obj.code = code.substring(2, 16);
    code = code.substring(16);
  } else {
    obj.error.push(err.MistakeLengthOfPackageCode);
  }
  return code;
};

/**
 * 获取定长的内容
 */
const getEnsureLength = (code, obj) => {
  let flag = true;

  // if (code.substring(0, 3) === '240') {
  //   // let spbh = code_sp.get(obj.code);
  //   // if ( !_.isUndefined(spbh)) {
  //   //   code = code.substring(spbh.length + 3);
  //   // }
  //   return '';
  // }

  // debug(code);

  while(flag) {
    let key = code.substring(0, 2); 
    const res = ['11', '13', '15', '17'].find(val => val === key);
    if(res) {
      if(code.length < 8) {
        obj.error.push(err.MistakeLengthOfEnsureAI);
      } else if(key === '11') {
        obj.SCRQ = Date.parse(moment('20'.concat(code.substring(2, 8))));
      } else if(key === '17') {
        obj.YXQZ = Date.parse(moment('20'.concat(code.substring(2, 8))));
      } else {
        obj[key] = code.substring(2, 8);
      }
      code = code.substring(8);
    } else {
      flag = false; 
    }
  }
  return code;
};

/**
 * 获取不定长内容
 */
const getUnensureLength = (code, obj) => {
  const index = code.indexOf(' ');
  if(index !== -1) {
    const arr = code.split(' ');
    arr.forEach(val => {
      handleSpace(val, obj);
    });
  } else {
    handleWithoutSpace(code, obj);
  }
};

/**
 * 处理多个不定长值的情况下，存在空格的情况
 */
const handleSpace = (val, obj) => {
  let key = val.substring(0, 2),
    res = ['10', '21', '30', '37'].find(row => row === key);
  if(res) {
    if(key === '10') {
      obj.SPPH = val.substring(2);
    } else {
      obj[key] = val.substring(2);
    }
  } else {
    key = val.substring(0, 3),
      res = ['240', '241', '250', '251'].find(row => row === key);
    if(res) {
      obj[key] = val.substring(3);
    }
  }
};

/**
 * 处理多个不定长AI 情况下，不存在空格的情况
 * 逻辑：先找10，若没有， 找21 
 * 暂时能解析的code: ‘10’打头，或者'10'不打头，存在'21'的情况
 */
const handleWithoutSpace = (code, obj) => {
  let i = code.indexOf('（');
  if (i !== -1) {
    code = code.substring(0, i);
  }

  if(code.substring(0, 2) === '10') {
    debug('需解析批号的剩余条码段为', code);
    isComplete = true;
    // obj.SPPH = code.substring(2, 22);
    const index = code.indexOf('21');
    if (index !== -1) {
      const lsh = code.substring(index + 2);
      debug('查找到的流水号为', lsh);
      obj.SPPH = lsh.length >= 3 && index >= 8 ? 
        code.substring(2, index) : code.substring(2, 22);
    } else {
      obj.SPPH = code.substring(2, 22);
    }

    // 圣犹达品牌 条码，判断 标识符91
    let batNumber = obj.SPPH,
      arr91 = batNumber.match(/91/g) || [],
      index91 = -1;

    for (let i = 0; i < arr91.length; i++) {
      debug('查找前index91为：', index91);
      index91 = batNumber.indexOf(91, index91+1);
      debug('查找后index91为：', index91);
      let code91 = batNumber.substring(index91 + 2),
        rest91 = batNumber.substring(0, index91);

      debug('查找到的识别码91后的条码内容为', code91);
      debug('若截取，得到的批号为', rest91);
      if (code91.length >= 9 && rest91.length >= 6) {
        obj.SPPH = batNumber.substring(0, index91);
        break;
      }
    }


    // let index91 = obj.SPPH.indexOf('91'),
    //   code91 = obj.SPPH.substring(index91 + 2),
    //   batNumber = obj.SPPH.substring(0, index91);
    // debug('查找到的识别码91后的条码内容为', code91);
    // debug('若截取，得到的批号为', batNumber);

    
    // debug('index is', index);
    // obj.SPPH = index >= 9 ? 
    //   // code.substring(2, index) + code.substring(index + 2) :
    //   code.substring(2, index) :
    //   code.substring(2, 22);

  } else {
    const index = code.indexOf('21');
    
    if (index !== -1) {
      obj.SPPH = obj['21'] = code.substring(index + 2, index + 22);
      isComplete = true;
    }
  }

};


module.exports = (tm) => {
  const obj = {error : []};
  // 保留原始上传的条码
  obj.TM = tm.map(val => val);
  // supplementCode(tm, obj);

  // 查找主码，因条码可以乱序扫描
  const index = tm.findIndex(val =>  ['00', '01', '02'].includes(val.substring(0, 2)) );
  if (index === -1) {
    obj.error.push(err.MainCodeMiss);
  } 

  // 条码重复判断
  const flag = tm.some( (v,i) => v === tm[i+1]);
  if (flag) {
    obj.error.push(err.RepeatCode);
  }
  
  if (obj.error.length > 0) {
    debug('条码有误, 运行结果如下');
    debug(obj);
    return;
  }

  // 主码解析
  tm[index] = getCodeOfPackage(tm[index], obj);

  // 副码解析
  tm.forEach(code => {
    code = getEnsureLength(code, obj);
    if(code.length > 0) {
      getUnensureLength(code, obj);
    }
  }); 
  if (!isComplete) {
    obj.error.push(err.CodeNotComplete);
  }

  debug('转换后的信息为：', obj);
  return obj;

};
