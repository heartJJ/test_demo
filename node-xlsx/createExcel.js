const XLSX = require('xlsx'),
  fs = require('fs'),
  request = require('request');


const requestApi = (option) => {
  return new Promise( (resolve, reject) => {
    request(option, (err, res, body) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return typeof body === 'string' ? resolve(JSON.parse(body)) : resolve(body);
    });
  });
};





const main = async () => {
  const option = {
    method: 'get',
    url: 'https://dts.fgrid.io/KRX/Company/812110000006/getSale?reqJson=%7B%22signkey%22:%22select%22,%22qsrq%22:%221580486400000%22,%22jsrq%22:%221588176000000%22%7D',
    // headers: basic_option.headers || { 'content-type': 'application/json' },
    // body: JSON.stringify(body),
    // qs: common_param
  };

  const res = await requestApi(option);
  console.log('-----------请求:', res.MESSAGE);

  let sheet = XLSX.utils.json_to_sheet(res.RETDATA);

  const workSheet = {
    SheetNames: ['sheet1'],
    Sheets: { sheet1 : sheet }
  };
  
  let str = XLSX.write(workSheet, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });
  
  let buffer = new Buffer(str, 'binary');
  
  fs.writeFileSync(__dirname + '/out1.xlsx', buffer,'binary');
  
  console.log('执行完毕');
  
  process.exit();
};

main();

