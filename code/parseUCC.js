service.parseSPTM = (tm) => {
  const obj = {}, 
  keyList = ['00', '01', '02', '03', '04', '05', '06', '07', '08'];
  let index = 0;
  Object.keys(tm).forEach(key => {
    const res = keyList.find(value => value === key);
    if (res && tm[key] !== null) { // ucc
    obj.ucc = `${tm[key]}`;
    index++;
    }
    if (key === '10' ) { // 批号
      const index = tm[key].indexOf('(');
      index !== -1 ? obj.spph = tm[key].substring(0, index) : obj.spph = tm[key];
      }
      if (key === '11' && !_.isNil(tm[key])) { // 生产日期
        obj.scrq = Date.parse(`20${tm[key].substring(0, 2)}/${tm[key].substring(2, 4)}/${tm[key].substring(4, 6)}`);
    }
    if (key === '17' && !_.isNil(tm[key])) { // 有效期止
    obj.yxqz = Date.parse(`20${tm[key].substring(0, 2)}/${tm[key].substring(2, 4)}/${tm[key].substring(4, 6)}`);
 }
 });
 if (index !== 1 || !obj.spph) {
   throw new ServiceError(msgPair.UCC_FORMAT_ERR);
   }
    return obj;
    };