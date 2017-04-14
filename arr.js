const CRKMXB = [
    {
        'KWID': 900000000002,
        'SPBH': '60162001',
        'SPPH': '1501001',
        'SPID': 2013,
        'SPPHID': 24866,
        'JXSID': 900000000207,
        'SPMC': '脊柱内固定器 钉棒系统 自断螺塞',
        'SPMS': '自断螺塞 标准螺钉 5.5棒',
        'SCRQ': 1420041600000,
        'YXQZ': null,
        'ZCZBM': '国食药监械(准)字2013第3461342号',
        'CKID': 900000000002,
        'CKMC': '默认仓库',
        'SL': 1,
        'DGSL': 10,
        'YFHSL': 3,
        'DFHSL': 2,
        'BCJH': 3,
        'WJHSL': 2,
        'CKCK': '默认仓库',
        'KWLJ': '浙江泰昌医疗器械有限公司-默认仓库-默认库位'
    },
    {
        'KWID': 900000000002,
        'SPBH': '60162002',
        'SPPH': '1506101',
        'SPID': 2014,
        'SPPHID': 24869,
        'JXSID': 900000000207,
        'SPMC': '脊柱内固定器 钉棒系统 自断螺塞',
        'SPMS': '自断螺塞 复位螺钉 5.5棒',
        'SCRQ': 1433088000000,
        'YXQZ': null,
        'ZCZBM': '国食药监械(准)字2013第3461342号',
        'CKID': 900000000002,
        'CKMC': '默认仓库',
        'SL': 1,
        'DGSL': 10,
        'YFHSL': 2,
        'DFHSL': 2,
        'BCJH': 1,
        'WJHSL': 6,
        'CKCK': '默认仓库',
        'KWLJ': '浙江泰昌医疗器械有限公司-默认仓库-默认库位'
    },
    {
        'KWID': 900000000091,
        'SPBH': '60162001',
        'SPPH': '1501001',
        'SPID': 2013,
        'SPPHID': 24866,
        'JXSID': 900000000207,
        'SPMC': '脊柱内固定器 钉棒系统 自断螺塞',
        'SPMS': '自断螺塞 标准螺钉 5.5棒',
        'SCRQ': 1420041600000,
        'YXQZ': null,
        'ZCZBM': '国食药监械(准)字2013第3461342号',
        'CKID': 900000000002,
        'CKMC': '默认仓库',
        'SL': 1,
        'DGSL': 10,
        'YFHSL': 3,
        'DFHSL': 2,
        'BCJH': 3,
        'WJHSL': 2,
        'CKCK': '默认仓库',
        'KWLJ': '浙江泰昌医疗器械有限公司-默认仓库-www'
    },
    {
        'KWID': 900000000091,
        'SPBH': '60162001',
        'SPPH': '1604053',
        'SPID': 2013,
        'SPPHID': 248,
        'JXSID': 900000000207,
        'SPMC': '脊柱内固定器 钉棒系统 自断螺塞',
        'SPMS': '自断螺塞 标准螺钉 5.5棒',
        'SCRQ': 1481577600000,
        'YXQZ': 0,
        'ZCZBM': '国食药监械(准)字2013第3461342号',
        'CKID': 900000000002,
        'CKMC': '默认仓库',
        'SL': 1,
        'DGSL': 10,
        'YFHSL': 3,
        'DFHSL': 0,
        'BCJH': 3,
        'WJHSL': 2,
        'CKCK': '默认仓库',
        'KWLJ': '浙江泰昌医疗器械有限公司-默认仓库-www'
    }
    ]

const arr = [];

CRKMXB.forEach(mx => {
    const res = arr.find(val => val.SPPHID === mx.SPPHID);
    if (res) {
        res.BCJH += mx.SL;
    } else {
        arr.push(Object.assign(mx, {BCJH: mx.SL}));
    }
});

console.log(arr);