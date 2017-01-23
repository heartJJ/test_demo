const fs = require('fs');
const path = require('path');
// const files = [];

const read = (option) => {
  return fs.readdirSync(option).map(val => {
    //console.log(val);
    const res = fs.statSync(path.resolve(option, val));
    if(res.isDirectory()) {
      return read(path.resolve(option, val));
    } else {
      return path.resolve(option, val);
    }
  });
}

const readdir = (dirname) => {
  return fs.readdirSync(dirname).map(filename => {
    const filePath = path.resolve(dirname, filename);
    const stat = fs.statSync(filePath);
    if(stat.isDirectory())
      return readdir(filePath);
    else if(stat.isFile())
      return [filePath];
  }).reduce((files, e) => [...files, ...e], []);
};


const files = read(path.resolve(__dirname, 'abc'));
console.log(files);


// const res = files.filter(val => path.extname(val) === '.js' && path.basename(val) !== 'index.js');

// console.log(res);
//
//
const res = readdir(path.resolve(__dirname, 'abc'));

console.log(res);


console.log(path.join(__dirname, '../image'));
console.log(path.resolve(__dirname, '../image'));