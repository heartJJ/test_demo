/**
 * 替换中文字符
 * @param {*} s 
 */
function stripscript(s) 
{ 
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") ;
  var rs = ''; 
  for (var i = 0; i < s.length; i++) { 
    rs = rs+s.substr(i, 1).replace(pattern, ''); 
  } 
  return rs; 
} 


let str = '刘延行（平台）【平台】{平台}';


console.log(stripscript(str));