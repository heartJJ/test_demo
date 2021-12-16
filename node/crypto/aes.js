'use strict';
const crypto = require('crypto');

//封装使用AES加密的方法
function aesEncrept(data, key){
　　//实例化一个cipher加密对象，使用aes192进行加密，key作为密钥
  　const cipher = crypto.createCipher('aes256',key);

　　//使用cipher对data进行加密，源数据类型为utf-8，输出数据类型为hex
  　let crypted = cipher.update(data, 'utf-8', 'hex');
  　crypted += cipher.final('hex');

  　return crypted;
}

//封装对应的AES解密方法
function aesDecrept(encrepted, key) {
　　//实例化一个decipher解密对象，使用aes192进行解密，key作为密钥
  　const decipher = crypto.createDecipher('aes256', key);

　　//使用decipher对encrepted进行解密，源数据类型为hex，输出数据类型为utf-8
  　let decrypted = decipher.update(encrepted, 'hex', 'utf-8');
  　decrypted += decipher.final('utf-8');

  　return decrypted;
}

//需要加密的数据
let data = 'This is what needs to be encrepted';

//AES加密的密钥
let keyword = 'This is the key';

//使用自定义的aesEncrept方法进行加密
let encrepted = aesEncrept(data, keyword);

//使用自定义的aesDecrept方法对加密数据进行解密
let decrepted = aesDecrept(encrepted, keyword);

console.log( '原始数据：' + data );
console.log( '经AES加密后：' + encrepted );
console.log( '经相应的解密后：' + decrepted );