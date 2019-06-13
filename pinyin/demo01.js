var pinyin = require('pinyin');

// console.log(pinyin('重庆'));    // [ [ 'zhōng' ], [ 'xīn' ] ]
console.log(pinyin('重庆爱力医疗器械有限公司', {
  heteronym: true               // 启用多音字模式
}));                            // [ [ 'zhōng', 'zhòng' ], [ 'xīn' ] ]
console.log(pinyin('重庆爱力医疗器械有限公司', {
  heteronym: true,              // 启用多音字模式
  segment: true                 // 启用分词，以解决多音字问题。
}));                


// var pinyin = require('pinyin');
            // [ [ 'zhōng' ], [ 'xīn' ] ]
// console.log(pinyin('重庆', {
//   style: pinyin.STYLE_FIRST_LETTER, // 设置拼音风格
//   heteronym: true
// }));        