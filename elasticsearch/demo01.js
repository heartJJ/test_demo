/**
 * 官方包简单示例
 */

const { Client, errors } = require('es7');

const client = new Client({ node: 'http://localhost:9200' });

// client.info(console.log);

const index = async () => {
  const result = await client.index({
    index: 'my-indev', //相当于database
    type: 'mytype1',  //相当于table
    id: JSON.stringify(new Date().getTime()),// 数据到唯一标示，id存在则为更新，不存在为插入
    body: {
      title: 'Test 3',
      tags: ['a', 'c'],
      published: true,
      published_at: '2014-07-01',
      counter: 3,
      name: '777'
    }
  });

  console.log(result);
};



const search = async () => {
  const result = await client.search({
    index: 'my-index',
    type: 'mytype2' 
  })

  result.body.hits.hits.forEach(v => console.log(v)  );
};



const main = async () => {
  await index();

  console.log('----------');

  // await search();
};


main();