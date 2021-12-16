const dayjs = require('dayjs');

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

console.log(dayjs(1600790400000).to(dayjs(1600477200000)));

const create_time = dayjs().hour(12).minute(0)
        .second(0)
        .millisecond(0)
        .valueOf(),
  end_format = dayjs(create_time).format('YYYY.MM.DD HH:mm:ss:SSS'),
  start_format = dayjs(create_time).subtract(7, 'days').format('YYYY.MM.DD HH:mm:ss');


console.log(create_time);
console.log(end_format);
console.log(start_format);


console.log( dayjs(create_time).hour(0).subtract(7, 'days').valueOf() );