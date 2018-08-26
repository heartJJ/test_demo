//公共引用
const fs = require('fs'),
  path = require('path');



/**
 * filename, 必选参数，文件名
 * [options],可选参数，可指定flag（文件操作选项，如r+ 读写；w+ 读写，文件不存在则创建）及encoding属性
 */

fs.readFileSync(__dirname + '/a.txt', {flag: 'r+', encoding: 'utf8'});


const data = '输入 \n 测试换行';

/**
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag,mode(权限),encoding
 */
fs.writeFileSync(__dirname + '/a.txt', data, {flag: 'a'});

fs.unlinkSync(__dirname + '/a.txt');