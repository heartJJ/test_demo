const { parse, parseAsync } = require('json2csv');

const fields = ['carModel', 'price'];
const opts = { fields };

const myData = [
  { 'carModel': 'Audi',      'price': 0,  'color': 'blue' },
  { 'carModel': 'BMW',       'price': 15000,  'color': 'red', 'transmission': 'manual' },
  { 'carModel': 'Mercedes',  'price': 20000,  'color': 'yellow' },
  { 'carModel': 'Porsche',   'price': 30000,  'color': 'green' }
];

// try {
//   const csv = parse(myData, opts);
//   console.log(csv);
// } catch (err) {
//   console.error(err);
// }


const test = async () => {
  const csv = await parseAsync(myData, opts);
  console.log(csv);
  console.log(Buffer.from(csv));
};
test();