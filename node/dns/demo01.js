const dns = require('dns');

/**
 * dns.lookup(hostname[, options], callback)
 * 将域名（比如 ‘runoob.com’）解析为第一条找到的记录 A （IPV4）或 AAAA(IPV6)。
 * 参数 options可以是一个对象或整数。
 * 如果没有提供 options，IP v4 和 v6 地址都可以。
 * 如果 options 是整数，则必须是 4 或 6。
 */
dns.lookup('fgrid.io', (err, address, family) =>{
  if(err) {
    return console.error(err);
  }
  console.log('lookup address: ' + address + ', family: ' + family);
});
// lookup address: 120.27.185.250, family: 4

/**
 * dns.resolve4(hostname, callback)
 * 仅能查询 IPV4记录
 */
dns.resolve4('fgrid.io', (err, address) => {
  if(err) {
    throw err;
  }
  console.log('resolve4 address.length: '+ address.length);
  address.forEach((a) => {
    console.log(`resolve4 address: ${a}`);
  });
});

/**
 * dns.reverse(ip, callback)
 * 反向解析 IP 地址，指向该 IP 地址的域名数组。
 */
dns.lookup('fgrid.io', (err, address, family) => {
  if(err) {
    return console.error(err);
  }
  dns.reverse(address, (err, hostnames) => {
    if(err) {
      return console.log(err);
    }
    console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
  });
});


// dns.resolve('syx201502.com', 'A', function(e, r) {
//   if (e) {
//     console.log(e);
//   }
//   console.log(r);
// });