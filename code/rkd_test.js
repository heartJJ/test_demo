var crkmx = [
  {SPPHID: 1, SL: 10, KWID: 90000},
  {SPPHID: 2, SL: 70, KWID: 90000},
  {SPPHID: 1, SL: 40, KWID: 90001}
];

var rkList = [
  {SPPHID: 1, SL: 50},
  {SPPHID: 3, SL: 40}
];

var ckList = [
  {SPPHID: 1, SL: 100},
  {SPPHID: 2, SL: 70},
  {SPPHID: 3, SL: 40}
];

crkmx.forEach(mx => {
    const rk = rkList.find(rk => rk.SPPHID === mx.SPPHID);
    if(rk) {
      rk.SL += mx.SL;
    } else {
      rkList.push(mx);
    }
  });

let flag = rkList.every(rk => {
    const res = ckList.find(ck => rk.SPPHID === ck.SPPHID);
    if(!res){
      console.log(123);
    }
    if(res.SL < rk.SL){
      console.log(1234);
    }
    return res.SL === rk.SL;
  });

  if(flag) {
    rkList.length === ckList.length ? flag = true : flag = false;
  }



console.log(rkList);
console.log(flag);