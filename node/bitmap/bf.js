// 定义一个布隆过滤器
function BoolmFilter(max_count,error_rate){
  var bitMap = [];//位图映射变量
  var max_count = max_count;//最多可放的数量
  var error_rate = error_rate;//错误率
    // 位图变量的长度
  var bit_size = Math.ceil( max_count * ( -Math.log(error_rate) / (Math.log(2)*Math.log(2)) ) );
  var hash_count = Math.ceil(Math.log(2)*(bit_size/max_count));
    //每次add的时候，都把key散列成k个值，并将这k个值对应的二进制位设置为1，那么为1的这个动作就需要执行n次。
    // 设置位的值
  var set_bit = function(bit){
    var arr_index = Math.floor(bit/32);
    var bit_index = Math.floor(bit%32);
    bitMap[arr_index] |= (1<<bit_index);
  };
  var get_bit = function(bit){
    var arr_index = Math.floor(bit/32);
    var bit_index = Math.floor(bit%32);
    return bitMap[arr_index]&=(1<<bit_index);
  };
  this.add = function(key){
    if(this.isExist(key)){
      return -1;//表示已存在
    }
    for(let i = 0;i<hash_count;i++){
      var hash_value = murmurhash3_32_gc(key,i);
      set_bit(Math.abs(Math.floor(hash_value%bit_size)));
    }
  };

  this.isExist = function(key){
    for(let i=0;i<hash_count;i++){
      var  hash_value = murmurhash3_32_gc(key,i);
      if(!get_bit(Math.abs(Math.floor(hash_value%bit_size)))){
        return false;
      }
    }
    return true;
  };
}

var bloom = new BoolmFilter(1000000,0.01);
bloom.add('https://www.jianshu.com/p/28dd26aaf2ee');
bloom.add('https://sh.qihoo.com/pc/detail?realtime');
console.log(bloom.isExist('https://www.jianshu.com/p/28dd26aaf2ee'));//true
console.log(bloom.isExist('https://sh.qihoo.com/pc/detail?realtime'));//true
console.log(bloom.isExist('https://sh.qihoo.com/pc/detail?realtime123123'));//false


//网上搜的哈希函数 
function murmurhash3_32_gc (key, seed) {
  let remainder = key.length & 3; // key.length % 4
  let bytes = key.length - remainder;
  let h1 = seed;
  let c1 = 0xcc9e2d51;
  let c2 = 0x1b873593;
  let i = 0;
  
  while (i < bytes) {
    let k1 =
        ((key.charCodeAt(i) & 0xff)) |
        ((key.charCodeAt(++i) & 0xff) << 8) |
        ((key.charCodeAt(++i) & 0xff) << 16) |
        ((key.charCodeAt(++i) & 0xff) << 24);
    ++i;
  
    k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;
  
    h1 ^= k1;
    h1 = (h1 << 13) | (h1 >>> 19);
  
    let h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
    h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
  }
  
  let k1 = 0;
  
  switch (remainder) {
    case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
    case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
    case 1: k1 ^= (key.charCodeAt(i) & 0xff);
  
      k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
      h1 ^= k1;
  }
  
  h1 ^= key.length;
  
  h1 ^= h1 >>> 16;
  h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
  h1 ^= h1 >>> 13;
  h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
  h1 ^= h1 >>> 16;
  
  return h1 >>> 0;
}
