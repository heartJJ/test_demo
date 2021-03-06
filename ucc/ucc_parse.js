/**
 * UCC解码，待完善
 */
const moment = require('moment'),
  debug = require('debug')('debug');

const err = {
  MistakeLengthOfArray: 1, // 条码数组长度有误
  MistakeLengthOfPackageCode: 2, // 包装代码的长度有误
  MistakeLengthOfEnsureAI: 3, // 定长AI的长度有误 
  CodeParseFail: 4, // 无法解析条码
  CodeNotComplete: 5 // 条码不完整，无 ‘10’ 和 ‘21’
};

/**
 * 补充完整条码，将数组合并成一个字符串
 */
const supplementCode = (tm, obj) => {
  if(tm.length === 2) {
    if(tm[0].length === 13) {
      tm[0] = '010'.concat(tm[0]);
    } else if(tm[0].length === 17) {
      tm[0] = '000'.concat(tm[0]);
    }
  }
  if(tm.length > 2) {
    obj.error = err.MistakeLengthOfArray;
  }
};

/**
 * 获取包装代码
 */
const getCodeOfPackage = (code, obj) => {
  let key = code.substring(0, 2);
  if(key === '00') {
    if(code.length < 20) {
      obj.error = err.MistakeLengthOfPackageCode;
    }
    obj.UCC = code.substring(2, 20);
    code = code.substring(20);
  } else if(key === '01' || key === '02') {
    if(code.length < 16) {
      obj.error = err.MistakeLengthOfPackageCode;
    }
    obj.UCC = code.substring(2, 16);
    code = code.substring(16);
  } else {
    obj.error = err.MistakeLengthOfPackageCode;
  }
  return code;
};

/**
 * 获取定长的内容
 */
const getEnsureLength = (code, obj) => {
  let flag = true;
  while(flag) {
    let key = code.substring(0, 2); 
    const res = ['11', '13', '15', '17'].find(val => val === key);
    if(res) {
      if(code.length < 8) {
        obj.error = err.MistakeLengthOfEnsureAI;
      } else if(key === '11') {
        obj.SCRQ = moment('20'.concat(code.substring(2, 8))).valueOf();
      } else if(key === '17') {
        obj.YXQZ = moment('20'.concat(code.substring(2, 8))).valueOf();
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
  let key = code.substring(0, 2);
  if(key === '10') {
    const index = code.indexOf('21');
    if(index !== -1) {
      const len = code.length - (index + 2); // 计算 21 后长度
      len >= 2 ? obj.SPPH = code.substring(2, index) : obj.SPPH = code.substring(2, 22);
    } else {
      code.length <= 22 ? obj.SPPH = code.substring(2) : obj.error = err.CodeParseFail;
    }
  } else {
    const index = code.indexOf('21');
    if(index !== -1) {
      obj.SPPH = obj['21'] = code.substring(index, index + 20);
    } else {
      obj.error = err.CodeNotComplete;
    }
  }
};


// module.exports = (tm) => {
//   const obj = {TM: []};
//   tm.forEach(val => obj.TM.push(val));
//   supplementCode(tm, obj);
//   tm[0] = getCodeOfPackage(tm[0], obj);
//   tm.forEach(code => {
//     code = getEnsureLength(code, obj);
//     if(code.length > 0) {
//       getUnensureLength(code, obj);
//     }
//   }); 
//   return obj;
// };

module.exports = (tm) => {
  const obj = {TM: []};
  tm.forEach(val => obj.TM.push(val));
  supplementCode(tm, obj);
  tm[0] = getCodeOfPackage(tm[0], obj);
  tm.forEach(code => {
    code = getEnsureLength(code, obj);
    if(code.length > 0) {
      getUnensureLength(code, obj);
    }
  }); 
  debug('转换后的信息为：', obj);
  return obj;
};
