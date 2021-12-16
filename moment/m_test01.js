const moment = require('moment');
const _ = require('lodash');

const startOf = (time = Date.now(), type = 'date', timezone = -480) => {
  type=type==='week'?'isoWeek':type;
  return moment(time).utcOffset(-timezone).startOf(type);
};

const endOf = (time=Date.now(),type='date',timezone=-480)=>{
  type=type==='week'?'isoWeek':type;
  return moment(time).utcOffset(-timezone).endOf(type);
};


// timezone 客户端 timezone
const generatorSection = (startTime,endTime,type='month',timezone=-480)=>{
  let startDate = startOf(startTime,type,timezone);
  let endDate= endOf(endTime,type,timezone);
  let section = endDate.diff(startDate,type)+1;
  return _.fill(Array(section),startDate.valueOf()).reduce(
    (p,c,i)=>{
      // let key = _.max([moment(c).add(i,type).valueOf(),startDay]);
      let key = moment(c).utcOffset(-timezone).add(i, type).valueOf();
      console.log('------', key.valueOf(), new Date(key.valueOf()));
      p[key]=0;
      return p;
    }, {});
};


const groupByDate = (objArray, startTime, endTime, timezone) => {
  // let daliy_data = generatorSection(startTime,endTime,'day',timezone);
  // let week_data = generatorSection(startTime,endTime,'week',timezone);
  let month_data = generatorSection(startTime,endTime,'month',timezone);

  const arr =  objArray.map(r=>{
    // r.date=startOf(r.cjsj,'day', timezone).valueOf();
    // r.week=startOf(r.cjsj,'week', timezone).valueOf();//Week(ISO) of Year 1-53,以周一~周日算一周
    r.month = startOf(r.cjsj, 'month', timezone).valueOf();
    console.log('----', r.id, r.month, new Date(r.month));
    return r;
  });
    
  const res = arr.reduce((pre, cur) => {
    pre.total += cur.xszje;
    // pre.daliy_data[cur.date] = cur.xszje + (pre.daliy_data[cur.date]||0);
    // pre.week_data[cur.week] = cur.xszje + (pre.week_data[cur.week]||0);
    pre.month_data[cur.month] = cur.xszje + (pre.month_data[cur.month]||0);
    return pre;
  }, { month_data, total: 0 });
  
  console.log(res);
  return res;
};

const convertObj2Array = (objData,type, timezone = -480)=>{
  // const server_timezone = new Date().getTimezoneOffset();
  return Object.keys(objData).map( (r, i) =>{
    // const offset = i === 0 ? timezone : server_timezone;

    return {
      start_time:Number(r),
      end_time: moment(Number(r)).utcOffset(-timezone).add(1,type).valueOf()-1,
      amount:objData[r]
    };
  });
};




const objArray = [
  { id: 1, cjsj: 1557322936458, xszje: 1 }, { id: 2, cjsj: 1557539137736, xszje: 2 },
  { id: 3, cjsj: 1560336427936, xszje: 3 }, { id: 4, cjsj: 1560508798973, xszje: 4 },
  { id: 5, cjsj: 1560935911067, xszje: 5 }, { id: 6, cjsj: 1560936154520, xszje: 6 },
  { id: 7, cjsj: 1562153157159, xszje: 7 }, { id: 8, cjsj: 1563250931132, xszje: 8 }
];
const res = groupByDate(objArray, 1556640000000, 1569859200111, -480);
const r = convertObj2Array(res.month_data, 'month');
console.log(r);