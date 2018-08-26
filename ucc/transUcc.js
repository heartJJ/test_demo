const _  = require('lodash');
const ucc_parse = require('./ucc_saas');

const formatUccCode = (code)=>{
  let tempCode = _.trim(code);
  let copyTempCode = tempCode.toUpperCase();
  let length = tempCode.length;
  let val=[];
  let skip=false;
  let hasChar=false;

  for(var i=0; i<length; i++){
    let v = copyTempCode.charCodeAt(i);
    if(v===65288 || v===40){//（(
      skip=true;
      if(i>0){
        break;
      }
    }
    if(v===65289 || v===41){//）)
      skip=false;
      continue;
    }
    if(skip){
      continue;
    }
    if(v<48 || (v>57 && v<65)|| v>90){//不在0-9A-Z区间的字符
      break;
    }
    if((v>=48 && v<=57)||(v>=65 && v<=90)){//0-9A-Z
      val.push(tempCode[i]);
    }
    if(v>=65 && v<=90){//存在字符，不完全是数字，可能是hibc码
      hasChar=true;
    }
  }

  if(val[0].charCodeAt(0)>=65 && val[0].charCodeAt(0)<=90){//HIBC
    return val.join('');
  }
  if(val.length <= 18 && hasChar){//UCC码中存在字符
    return '';
  }
  if(val.length<14){//UCC
    return '';
  }
  if (val.length > 18) {
    return ucc_parse([val.join('')]).code;
  }

  tempCode = val.join('');
  if(val.length===14){
    return tempCode;
  }
  if(val.length===16 && _.startsWith(tempCode,'01')){
    return tempCode.substr(2,14);
  }
  if(val.length===18){
    if(_.startsWith(tempCode,'00')){
      return tempCode.substr(2,16);
    }
    return tempCode;
  }
};

console.log(formatUccCode('010359601019766517260606111606081016FM05662'));