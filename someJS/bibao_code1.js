// var name = "The Window";
// 　　var object = {
// 　　　　name : "My Object",
// 　　　　getNameFunc : function(){
// 　　　　　　return function(){
// 　　　　　　　　return this.name;
// 　　　　　　};
// 　　　　}
// 　　};
// 　　
// console.log(object.getNameFunc()());


function f1(){
　　　　var n=999;
　　　　function f2(){
　　　　　　console.log(n); 
　　　　}
　　　　return f2;
　　}
　　var result=f1();
　　result(); // 999