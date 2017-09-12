const _ = require('lodash'),
  moment = require('moment'),
  debug = require('debug')('debug'),
  error = {
    BarcodeNotAString: 1, // 条码非string
    EmptyBarcode: 2, // 条码为空
    BarcodeNotHIBC: 3, // 非HIBC条码
    InvalidBarcode: 4, // 条码格式有误
    InvalidDate: 5, // 错误的日期格式
    EmptyCheckCharacter: 6,
    EmptyLinkCharacter: 7,
    InvalidQuantity: 8,
    InvalidMainCode: 9, // 主码格式不符合要求
    InvalidAuxiliaryCode: 10 // 副码格式不符合要求
  },
  type = {
    Concatenated: 1, // 主副码一起，以 '/'分隔
    Line1: 2, // 主码
    Line2: 3 // 副码
  };

let err;

/**
 * 验证条码
 * @param code 需进行判断的条码部分
 * @param number 数字标记，决定错误判断的条件
 */
const checkCode = (code, number, length = 0) => {
  switch (number) {
    case 1: err = !_.isString(code) ? error.BarcodeNotAString : 0; break;
    case 2: err = _.isEmpty(code) ? error.EmptyBarcode : 0; break;
    case 3: err = code.charAt(0) !== '+' ? error.BarcodeNotHIBC : 0; break;
    case 4: err = code.length < 4 ? error.InvalidBarcode : 0; break;
    case 5: err = code.length < 6 ? error.InvalidMainCode : 0; break;
    case 6: err = code.length < 5 ? error.InvalidDate : 0; break;
    case 7: err = _.isEmpty(code) ? error.EmptyCheckCharacter : 0; break;
    case 8: err = !_.isNumber(code) ? error.InvalidQuantity : 0; break;
    case 9: err = _.isEmpty(code) ? error.EmptyLinkCharacter : 0; break;
    case 10: err = !_.isNumber(code) ? error.InvalidDate : 0; break;
    case 11: err = code.length < length ? error.InvalidDate : 0; break;
    case 12: err = error.InvalidAuxiliaryCode; break;
    case 13: err = error.InvalidBarcode; break;
    default: err = 0; break;
  }
  if (err !== 0) {
    debug('条码错误代码为：' + err);
    debug('出错的步骤为：' + number);
    throw new Error('条码解析错误');
  }
};

/**
 * 去掉首尾的*号
 */
const remove = barcode => {
  if (barcode.charAt(0) === '*') {
    barcode = barcode.substring(1);
    checkCode(barcode, 2);
  }
  if (barcode.charAt(barcode.length - 1) === '*') {
    barcode = barcode.substring(0, barcode.length - 1);
    checkCode(barcode, 2);
  }
  return barcode;
};

/**
 * 正则验证
 */
const matchesLetters = character => {
  const letters = /^[a-zA-Z]+$/;
  return character.match(letters);
};

/**
 * 主码解析，当t为1时，没有check属性
 * @param parseCode 解析结果
 * @param t 条码类型 
 * @param code 待解析的部分条码
 */
const parseMainCode = (parseCode, t, code) => {
  parseCode.type = t;
  checkCode(code, 5); // 长度至少应有6位
  
  parseCode.labelerId = code.substring(0, 4); // 厂商信息
  code = code.substring(4);

  if (parseCode.type !== type.Concatenated) {
    parseCode.check = code.charAt(code.length - 1); // 最后一位校验码
    code = code.substring(0, code.length - 1);
  }
  
  parseCode.uom = parseInt(code.charAt(code.length - 1)); // 倒数第二位校验码
  code = code.substring(0, code.length - 1);

  parseCode.product = code; // 物料号
  return parseCode;
};

/**
 * 解析副码的验证码和批号信息
 * 若为第二副码，当前方法解析所得的批号（包含日期和批号），需要进一步解析
 * @param parseCode 解析结果
 * @param code 待解析的部分条码
 * @param t 条码类型
 * @param propertyName 属性名(lot 或 serial，lot为批号，serial 暂不明)
 * @param hasQty 是否含有quatity属性， '$$'或'$$+' 开头的副码有该属性
 */
const getLotSerialCheckLink = (parseCode, code, t, propertyName, hasQty) => {
  checkCode(code, 7); // 验证长度
  parseCode.lot = code;

  if (hasQty) {
    code = getQuantity(parseCode, code);
  }

  parseCode.check = code.substring(code.length - 1); // 获取末位验证码
  code = code.substring(0, code.length - 1);

  if (t !== type.Concatenated) {
    checkCode(code, 9);
    parseCode.link = code.substring(code.length - 1); // 获取倒数第二位验证信息
    code = code.substring(0, code.length - 1);
  }

  // if (t === type.Concatenated) {
  //   debug('处理前:', code);
  //   code = code.replace(/[a-zA-Z]{1}\d{2}$/, '');
  //   debug('处理后:', code);
  // }

  parseCode[propertyName] = code;
  return parseCode;
};

/**
 * '$$' 或'$$+'开头的第二副码解析时使用，取决于之后跟的第一个字符的值
 * 若为8或9，则进一步解析上一步得到的批号，从中解析出一个quatity属性
 */
const getQuantity = (parseCode, code) => {
  const i = parseInt(code.charAt(0), 10);
  if (!_.isNumber(i)) {
    return code;
  }

  let length;
  switch (i) {
    case 8: length = 2; break;
    case 9: length = 5; break;
    default: return code;
  }

  const quantity = parseInt(code.substring(1, length), 10);
  code = code.substring(length + 1);
  checkCode(quantity, 8); // 验证quantity是否为数字
  parseCode.quantity = quantity;
  return code;
};

/**
 * 解析第二副码的日期和批号信息
 * @param parseCode 解析结果
 * @param propertyName 属性名（lot 或 serial）
 */
const getDate = (parseCode, propertyName) => {
  let string = parseCode[propertyName];
  if (!_.isString(string) || _.isEmpty(string)) {
    return;
  }

  const dateFormat = parseInt(string.substring(0, 1), 10);
  checkCode(dateFormat, 10); // 验证是否为数字

  let format;
  switch (dateFormat) {
    case 0:
    case 1:
      format = 'MMYY';
      break;
    case 2:
      format = 'MMDDYY';
      break;
    case 3:
      format = 'YYMMDD';
      break;
    case 4:
      format = 'YYMMDDHH';
      break;
    case 5:
      format = 'YYDDD';
      break;
    case 6:
      format = 'YYDDDHH';
      break;
    case 7:
      // no date following the 7
      parseCode[propertyName] = string.substring(1);
      return;
    default:
      // no date char
      return; 
  }

  if (dateFormat > 1) {
    string = string.substring(1);
  }

  checkCode(string, 11, format.lenght);

  parseCode.date = moment(string.substring(0, format.length), format);
  parseCode[propertyName] = string.substring(format.length);

};

/**
 * 副条码解析
 * @param parseCode 解析结果
 * @param t 条码类型 
 * @param code 待解析的部分条码
 */
const parseAuxiliaryCode = (parseCode, t, code) => {
  console.log(code);
  parseCode.type = t;
  if (code.length > 0 && !isNaN(code.charAt(0))) {
    checkCode(code, 6); // '+'号打头，长度需大于5位
    parseCode.date = moment(code.substring(0, 5), 'YYDDD');
    getLotSerialCheckLink(parseCode, code.substring(5), t, 'lot', false);
  } else if (code.length > 2 && code.charAt(0) === '$' && !isNaN(code.charAt(1))) {
    getLotSerialCheckLink(parseCode, code.substring(1), t, 'lot', false);
  } else if (code.length > 3 && code.substring(0, 2) === '$+' && !isNaN(code.charAt(2))) {
    getLotSerialCheckLink(parseCode, code.substring(2), t, 'serial', false);
  } else if (code.length > 3 && code.substring(0, 2) === '$$' && !isNaN(code.charAt(2))) {
    getLotSerialCheckLink(parseCode, code.substring(2), t, 'lot', true);
    getDate(parseCode, 'lot');
  } else if (code.length > 3 && code.substring(0, 3) === '$$+') {
    getLotSerialCheckLink(parseCode, code.substring(3), t, 'serial', true);
    getDate(parseCode, 'serial');
  } else {
    checkCode(code, 12);
  }
  return parseCode;
};

/**
 * 条码解析的起始方法
 */
const parseHIBC = barcode => {
  const parseCode = {
    barcode: _.clone(barcode) // 保留原始条码
  };

  checkCode(barcode, 1); // 验证是否为String
  barcode = remove(barcode);  // 去掉首尾 '*' 号
  checkCode(barcode, 3); // 验证是否 '+' 开头
  barcode = barcode.substring(1);
  checkCode(barcode, 4); // 验证长度是否符合

  const checkAndLinkCharacters = barcode.substring(barcode.length - 2); // 获取末两位的标志位
  barcode = barcode.substring(0, barcode.length - 2); 

  const array = barcode.split('/');
  if (array.length === 1) {
    if (matchesLetters(array[0].charAt(0))) {
      return parseMainCode(parseCode, type.Line1, array[0] + checkAndLinkCharacters); // 解析主码
    } else {
      return parseAuxiliaryCode(parseCode, type.Line2, array[0] + checkAndLinkCharacters); // 解析副码
    }
  } else if (array.length === 2) {
    parseMainCode(parseCode, type.Concatenated, array[0]);
    parseAuxiliaryCode(parseCode, type.Concatenated, array[1] + checkAndLinkCharacters);
    return parseCode;
  } else {
    checkCode(barcode, 13);
    return parseCode;
  }
};

/**
 * 处理商品批号, 暂时只处理两种情况，后续有其他类型，再补充reg数组
 */
const handleSPPH = (obj) => {
  let batNumber = _.isUndefined(obj.SERIAL) ? obj.LOT : obj.SERIAL;

  let reg = [/[a-zA-Z]{1}\d{2}$/, /[a-zA-Z]{1}\d{1}$/],
    index = 0;

  do {
    obj.SPPH = batNumber.replace(reg[index], '');
    index++;
  } while(obj.SPPH === batNumber && index <= reg.length - 1);
  
};

module.exports = arrOfCode => {
  const obj = {};
  arrOfCode.forEach(val => {
    const parseCode = parseHIBC(val);
    debug('解析结果如下：');
    debug(parseCode);
    Object.keys(parseCode).forEach(key => {
      switch (key) {
        case 'product': obj.SPBH = parseCode.product; break;
        case 'labelerId': obj.CSXX = parseCode.labelerId; break; //厂商信息
        case 'lot': obj.LOT = parseCode.lot; break;
        case 'serial': obj.SERIAL = parseCode.serial; break;
        case 'date': obj.YXQZ = Date.parse(parseCode.date); break;
        case 'uom': obj.uom = parseCode.uom; break;
        default: break;
      }
    });
  });

  obj.code = obj.CSXX + obj.SPBH + obj.uom;
  // let batNumber = _.isUndefined(obj.SERIAL) ? obj.LOT : obj.SERIAL;
  // obj.SPPH = batNumber.replace(/[a-zA-Z]{1}\d{2}$/, '');
  handleSPPH(obj);

  debug('转换后结果如下：');
  debug(obj);
  return obj;
};