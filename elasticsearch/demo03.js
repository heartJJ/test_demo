const request = require('request');

const debug = require('debug')('debug');

const chalk = require('chalk');

const requestApi = (option) => {
  return new Promise( (resolve, reject) => {
    request(option, (err, res, body) => {
      if(err) {
        debug(chalk.red('this is err .....................'));
        debug(err);
        return reject(err);
      }
      debug(chalk.green('this is data .....................'));
      debug(body);
      return typeof body === 'string' ? resolve(JSON.parse(body)) : resolve(body);
    });
  });
};

const local_body = {
  'query': {
    "match_all": {}
    // 'bool': {
    //   'filter': [
    //     { 'term': { 'published': true } },
    //     { 'range': {
    //         'published_at': { 'gte': '2013-03-01', 'lte': '2015-01-01' }
    //     }}
    //   ]
    // }
  }
};

/**
 * search 方法， pretty 为格式化参数
 */
const get = async () => {
  const option = {
    method: 'get',
    url: 'http://127.0.0.1:9200/my-index/_search?pretty',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(local_body)
  };

  return await requestApi(option);
};  

/**
 * validate 验证请求是否正确
 */
const validate = async () => {
  const option = {
    method: 'get',
    url: 'http://127.0.0.1:9200/my-inde*/_validate/query?explain',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(local_body)
  };

  await requestApi(option);
};

/**
 * 单条插入数据
 */
const create = async () => {
  for (let i = 0; i < 20; i++) {
   
    const option = {
      method: 'POST',
      url: 'http://127.0.0.1:9200/my-index/mytype',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({  
        // index: 'my-index', //相当于database
        // type: 'mytype',  //相当于table
        // id: JSON.stringify(new Date().getTime()),// 数据到唯一标示，id存在则为更新，不存在为插入
        body: {
          title: i,
        }
      })
    };

    await requestApi(option);
  }
};

/**
 * scroll 模式开启，  sort by _doc 即 旧版本的 search_type = scan
 */
const scroll_first = async () => {
  const body = {
    "query": { "match_all": {}},
    'size': 7,
    "sort": [
      "_doc"
    ]
  };
  const url = 'http://127.0.0.1:9200/my-index/_search?scroll=1m';
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

/**
 * scroll 模式获取数据，注意每一次的 scroll_id 都会改变
 */
const scroll = async (_scroll_id) => {
  const body = {
    "scroll": "1m",
    "scroll_id": _scroll_id,
  };
  const url = 'http://127.0.0.1:9200/_search/scroll?';
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
const run = async () => {
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


const mget = async (ids) => {
  const option = {
    method: 'get',
    url: 'http://127.0.0.1:9200/my-index/mytype/_mget?pretty',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ids})
  };

  await requestApi(option);
}



const main = async () => {
   // await create();

  // await validate();

  // debug(chalk.yellow('******************'));

  const { hits } = await get();
  const ids = hits.hits.map(v => v._id);

  debug('尝试mget请求');
  debug(ids);
  await mget(ids);
}



// run();

main();