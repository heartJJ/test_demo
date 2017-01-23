// function Timer() {
//   this.s1 = 0;
//   this.s2 = 0;
//   // 箭头函数
//   setInterval(() => {
//     this.s1++
//     console.log(this.s1);
//   }, 1000);
//   // 普通函数
//   setInterval(function () {
//     this.s2 = 0;
//     this.s2++;
//     console.log(this.s2);
//   }, 1000);
// }

// var timer = new Timer();

// setTimeout(() => console.log('s1: ', timer.s1), 3100);
// setTimeout(() => console.log('s2: ', timer.s2), 3100);


function log(){
  console.log.apply(console, arguments);
};
log(1);    //1
log(1,2);    //1 2
