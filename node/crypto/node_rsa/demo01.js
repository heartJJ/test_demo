var NodeRSA = require('node-rsa');
 
var key=new NodeRSA({b: 1024});
key.setOptions({encryptionScheme: 'pkcs1'});
 
var publicDer = key.exportKey('public-der');
var privateDer = key.exportKey('pkcs8-private-der');
 
var publicKeyStr=publicDer.toString('base64');
var privateKeyStr=privateDer.toString('base64');
 
console.log(publicKeyStr);
console.log(privateKeyStr);
 
var str='马志宇|marsyoung|0907__';
// var y=key.encrypt(str,'base64')
// console.log(y)
 
var key2 = new NodeRSA();
key2.setOptions({encryptionScheme: 'pkcs1'});
key2.importKey('-----BEGIN PRIVATE KEY-----\n'+privateKeyStr+'-----END PRIVATE KEY-----','pkcs8-private');
var x=key2.encrypt(str, 'base64');
console.log(x);
console.log(key2.decrypt(x,'utf8'));
