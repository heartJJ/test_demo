var chnUnitChar = ["","十","百","千"];
var chnUnitSection = ["","万","亿","万亿","亿亿"];

var chnNumChar = {
  0: '零',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九'
};

// var chnNameValue = {
//   '十':{value:10, secUnit:false},
//   '百':{value:100, secUnit:false},
//   '千':{value:1000, secUnit:false},
//   '万':{value:10000, secUnit:true},
//   '亿':{value:100000000, secUnit:true}
// };


function SectionToChinese(section){
  var strIns = '', chnStr = '';
  var unitPos = 0;
  var zero = true;
  // console.log(section);
  while(section > 0){
    var v = section % 10;
    if(v === 0){
      if(!zero){
       
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    }else{
      
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}


function NumberToChinese(num){
  var unitPos = 0;
  var strIns = '', chnStr = '';
  var needZero = false;

  if(num === 0){
    return chnNumChar[0];
  }

  while(num > 0){
    var section = num % 10000;
    if(needZero){
      chnStr = chnNumChar[0] + chnStr;
    }
    strIns = SectionToChinese(section);
    // console.log(section);
    // console.log(chnUnitSection[unitPos]);
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
    // console.log(strIns);
    chnStr = strIns + chnStr;
    needZero = (section < 1000) && (section > 0);
    num = Math.floor(num / 10000);
    unitPos++;
  }

  return chnStr;
}


const res = NumberToChinese(127345110030000);

console.log(res);