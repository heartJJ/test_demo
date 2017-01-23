const arr = [
                {
                  'FPFJID': 1,
                  'FPDM': null,
                  'FPHM': null,
                  'SPID': 1,
                  'SPPPID': 1,
                  'SPBH': '10000',
                  'SPMC': '商品1',
                  'SPMS': '测试商品',
                  'YSSL': 10,
                  'KYSL': 3,
                  'YYSL': 7,
                  'X1': 100,
                  'Y1': 20,
                  'X2': 80,
                  'Y2': 30,
                  'PPMC': '品牌1'
                },
                {
                  'FPFJID': 2,
                  'FPDM': null,
                  'FPHM': null,
                  'SPID': 1,
                  'SPPPID': 1,
                  'SPBH': '10000',
                  'SPMC': '商品1',
                  'SPMS': '测试商品',
                  'YSSL': 22,
                  'KYSL': 9,
                  'YYSL': 13,
                  'X1': 50,
                  'Y1': 60,
                  'X2': 70,
                  'Y2': 80,
                  'PPMC': '品牌1'
                },
                {
                  'FPFJID': 3,
                  'FPDM': null,
                  'FPHM': null,
                  'SPID': 1,
                  'SPPPID': 1,
                  'SPBH': '10000',
                  'SPMC': '商品1',
                  'SPMS': '测试商品',
                  'YSSL': 13,
                  'KYSL': 5,
                  'YYSL': 8,
                  'X1': 10,
                  'Y1': 20,
                  'X2': 30,
                  'Y2': 40,
                  'PPMC': '品牌1'
                },
                {
                  'FPFJID': 1,
                  'FPDM': null,
                  'FPHM': null,
                  'SPID': 2,
                  'SPPPID': 1,
                  'SPBH': '20000',
                  'SPMC': '商品2',
                  'SPMS': '测试商品',
                  'YSSL': 8,
                  'KYSL': 6,
                  'YYSL': 2,
                  'X1': 100,
                  'Y1': 20,
                  'X2': 120,
                  'Y2': 30,
                  'PPMC': '品牌1'
                },
                {
                  'FPFJID': 2,
                  'FPDM': null,
                  'FPHM': null,
                  'SPID': 2,
                  'SPPPID': 1,
                  'SPBH': '20000',
                  'SPMC': '商品2',
                  'SPMS': '测试商品',
                  'YSSL': 16,
                  'KYSL': 10,
                  'YYSL': 6,
                  'X1': 60,
                  'Y1': 70,
                  'X2': 80,
                  'Y2': 90,
                  'PPMC': '品牌1'
                },
                {
                  'FPFJID': 1,
                  'FPDM': null,
                  'FPHM': null,
                  'SPID': 3,
                  'SPPPID': 2,
                  'SPBH': '30000',
                  'SPMC': '商品3',
                  'SPMS': '测试商品',
                  'YSSL': 18,
                  'KYSL': 5,
                  'YYSL': 13,
                  'X1': 20,
                  'Y1': 30,
                  'X2': 40,
                  'Y2': 50,
                  'PPMC': '品牌2'
                },
                {
                  'FPFJID': 3,
                  'FPDM': null,
                  'FPHM': null,
                  'SPID': 3,
                  'SPPPID': 2,
                  'SPBH': '30000',
                  'SPMC': '商品3',
                  'SPMS': '测试商品',
                  'YSSL': 31,
                  'KYSL': 7,
                  'YYSL': 24,
                  'X1': 40,
                  'Y1': 50,
                  'X2': 60,
                  'Y2': 70,
                  'PPMC': '品牌2'
                }
              ];
    
const address = [];

const func = () => {
  arr.forEach(val => {
    const res = address.find(row => row.FPFJID === val.FPFJID);
    if(res) {
      res.SPWZ.push(val);
    } else {
      address.push(Object.assign({}, {FPFJID: val.FPFJID, FPDM: val.FPDM, FPHM: val.FPHM, SPWZ: [val]}));
    }
  });
};

func();

address.forEach(val => {
  console.log('FPFJID:' + val.FPFJID);
  val.SPWZ.forEach(row => console.log(row));
});