const request = require('request');
const _ = require('lodash');


const post = (option) => {
  return new Promise((resolve, reject) => {
    request.post(option, function(err, res, body) {
      if(err)
        reject(err);
      else
        resolve({res, body});
    });
  });
};


const option = {
  url : 'https://jinshuju.net/f/p6BRAh',
  headers: {
    // ':authority': 'jinshuju.net',
    // ':method': 'POST',
    // ':path': '/f/p6BRAh',
    // ':scheme': 'https',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'cache-control': 'max-age=0',
// 'content-length: 225
    'content-type': 'application/x-www-form-urlencoded',
    'cookie': 'formSubmitSuccess=true; jsj_uid=bc9dd126-b197-4d01-a127-fe15a763573f; country_code=CN; Hm_lvt_47cd03e974df6869353431fe4f4d6b2f=1556433361; _smtv=; _smt_uid=5cc549d1.5037bcf0; _gd_session=VVgrSDZKeGRSa2M0VHFINzVkMEw3RFQzNjFTSGM4SGo2dzV0ZGZLVi9aSEE5cElpbnVzR3hiTU9Kc0JGQmsvQmpIaEF1SjhEQXI0emJNZHczbjM1VVUwNlQraFBOS3p1VUIvZnpUempYOXAxWnI5dG8wQU84ZnQ4a0pUN1BYU2p4ZEtLQ3dZTFlDeU5rSnFjNWFialVnPT0tLWF0TG5xNDZseWNwU0FTWWk5Ym1wMkE9PQ%3D%3D--d88ff03f6305e25e43aa614f36b3bc8ed587fd10; Hm_lpvt_47cd03e974df6869353431fe4f4d6b2f=1556433636',
    'origin': 'https://jinshuju.net',
    'referer': 'https://jinshuju.net/f/p6BRAh',
    'upgrade-insecure-requests': 1,
// 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36
  },

  formData: {
    'authenticity_token': 'HNGuuOnINdnQFq5ZwgYgT5Fj0qA3J2d40pSazEuk4NeKBSLmFQ7gb8VKJNvLUUFL3kSP1ImWg6X2sWnppSE5jg==',
    'entry[field_5]': 'ZDIB'
  },
  'proxy':'http://27.154.180.71:23638'
};

// const random = () => {
//   var ip = _.random(1 , 254)  
//   + '.' + _.random(1 , 254)  
//   + '.' + _.random(1 , 254)  
//   + '.' + _.random(1 , 254);  
// };

const shua = async () => {
  for (let i = 0; i< 1; i ++) {

    // const ip = _.random(1 , 254)   + '.' + _.random(1 , 254)   + '.' + _.random(1 , 254)   + '.' + _.random(1 , 254);  
  
    // console.log('ip', ip);
  
    // Object.assign(option.headers, { 'X-Forwarded-For': ip });
  
    try {
      const result = await post(option);

      console.log(result.res.headers);
    } catch (error) {
      console.log(error);
    }
  
  }
}


shua();