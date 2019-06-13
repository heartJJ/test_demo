const request = require('request');

const debug = require('debug')('debug');

const chalk = require('chalk');

const userIds = [
  810000000064,
  810000000065,
  810000000066,
  810000000067,
  810000000068,
  810000000069,
  810000000070,
  810000000071,
  810000000072,
  810000000073,
  810000000074,
  810000000075,
  810000000309,
  810000000310,
  810000000311,
  810000000312,
  810000000313,
  810000000314,
  810000000315,
  900000000388,
  900000000400,
  900000000402,
  900000000403,
  900000000404,
  900000000405,
  900000000411,
  900000000413,
  900000000414,
  900000000417,
  900000000430,
  900000000433,
  900000000436,
  900000000498,
  900000000506,
  900000000508,
  900000000511,
  900000000514,
  900000000527,
  900000000528,
  900000000529,
  900000000539,
  900000000560,
  900000000561,
  900000000565,
  900000000575,
  900000000576,
  900000000579,
  900000000586,
  900000000588,
  900000000591,
  900000000592,
  900000000594,
  900000000596,
  900000000630,
  900000000631,
  900000000632,
  900000000633,
  900000000634,
  900000000635,
  900000000640,
  900000000641,
  900000000642,
  900000000643,
  900000000644,
  900000000645,
  900000000649,
  900000000669,
  900000000690,
  900000000693,
  900000000694,
  900000000877,
  900000000881,
  900000002016,
  900000002121,
  900000002122,
  900000002124,
  900000002125,
  900000002651,
  900000002652,
  900000002940,
  900000003601,
  900000003759,
  900000003761,
  900000003762,
  900000003763,
  900000003765,
  900000003778,
  900000003779,
  900000004183,
  900000004629,
  900000007739,
  900000007815,
  900000007991,
  900000008064,
  900000009722,
  900000009737,
  900000009738,
  900000009753,
  900000009754,
  900000009755,
  900000009756,
  900000009760,
  900000014384,
  900000014661,
  900000014691,
  900000014720,
  900000014858,
  900000014859,
  900000014864,
  900000014865,
  900000014920,
  900000014938,
  900000014939,
  900000014974,
  900000014975,
  900000015002,
  900000015022,
  900000015055,
  900000015056,
  900000015058,
  900000017293,
  900000017471,
  900000017478,
  900000017480,
  900000017494,
  910000017277,
  910000017281,
  910000017289,
  910000017295,
  910000017298,
];

const size = 500;

const requestApi = (option) => {
  return new Promise( (resolve, reject) => {
    request(option, (err, res, body) => {
      if(err) {
        debug(chalk.red('this is err .....................'));
        debug(err);
        return reject(err);
      }
      debug(chalk.green('this is data .....................'));
     
      const result =  typeof body === 'string' ? JSON.parse(body) : body;
      // debug(result);
      resolve(result);
    });
  });
};


const scroll_first = async () => {
  const body = {
    'query': {
      'bool': {
        'filter': [
          { 'terms': { 'userId': userIds } },
          { 'range': {  
            '@timestamp': { gte: "2019-05-03T04:53:00.876Z", lte: "2019-05-31T05:10:32.349Z"  }
          } }
        ],
        'must_not': [
          { match: { method: 'GET'} }
        ]
      },
    },
    'size': size,
    "sort": [
      "_doc"
    ]
  };
  const url = 'http://116.62.57.148:32101/log_saas_develop-2019.*/_search?scroll=1m&_source=url,@timestamp,params,userId';
  const option = {
    method: 'get',
    url,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  
  return await requestApi(option);
};

const scroll = async (_scroll_id) => {
  const body = {
    "scroll": "1m",
    "scroll_id": _scroll_id,
  };
  const url = 'http://116.62.57.148:32101/_search/scroll?';
  const option = {
    method: 'get',
    url,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  
  return await requestApi(option);
};


let scroll_id, length = 0;

const main = async () => {
  console.time('search');
  debug(`scroll init....`);
  const { _scroll_id, hits } = await scroll_first();

  length = hits.hits.length;
  scroll_id = _scroll_id;

  let arr = hits.hits, i = 1;

  while(length > 0) {
    debug(`这是第${i}次查询, scroll_id 为 ${scroll_id}`);
    const { _scroll_id, hits } = await scroll(scroll_id);
    length = hits.hits.length;
    scroll_id = _scroll_id;

    arr = arr.concat(hits.hits);
    i++;
  }

  debug(`arr 总数为: ${arr.length}`)

  console.timeEnd('search');
}

main();