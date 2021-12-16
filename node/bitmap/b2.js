function BitMap(max) {
  const size = Math.floor(max / 32) + 1,
    bit_arr = new Array(size).fill(0);

  this.addMember = function(member){
      //决定在数组中的索引
    const arr_index = Math.floor(member/32);
      //决定在整数的32个bit位的哪一位
    const bit_index = member % 32;
    bit_arr[arr_index] = bit_arr[arr_index] | 1 << bit_index;
    
    console.log(bit_arr);
  };
  this.isExist = function(member){
    const arr_index = Math.floor(member/32);
    const bit_index = member % 32;
    return ( bit_arr[arr_index] & 1 << bit_index) !== 0;
  };

  return this;
};

const bMap = BitMap(100);

// [0,6,88,7,73,34,10,99,22].forEach(v => bMap.addMember(v));

// const sort_arr = [];
// for (let i = 0; i < 99; i++) {
//   if(bMap.isExist(i)){
//     sort_arr.push(i);
//   }  
// }
// console.log(sort_arr);