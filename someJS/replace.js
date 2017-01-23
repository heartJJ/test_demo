var str = 'Twas the night before Xmas...';
var newstr = str.replace(/xmas/i, 'Christmas');
console.log(newstr);  // Twas the night before Christmas...


function replacer(match, p1, p2, p3, offset, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);

console.log(newString);


var date="2014-05-08 00:22:11",
  res = date.replace(/-/g, "/"),
   res1 = new Date(Date.parse(res)),
   date = res1.getTime();

console.log(res);
console.log(res1);

console.log(Date.parse('2016/01/01'));


const str1 = '160101';
const scrq = `20${str1.substring(0, 2)}/${str1.substring(2, 4)}/${str1.substring(4, 6)}`;
console.log(scrq);


"Cannot read property 'substring' of null"