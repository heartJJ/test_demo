const arr1 = [
  {a: 1, b: 1, c: 'asdasda', d:'asdasda'},
  {a: 1, b: 2, c: 'dqdasdad', d: 'asdasd'},
  {a: 1, b: 1, c: 'asdddddddddddddddddd', d: 'dasdasd'},
  {a: 1, b: 2, c: 'eeeeeeeeeeeeeeee', d:'dasddss'},
];


arr1.forEach(a => {
  a.e = [{}];
  Object.keys(a).forEach(key => {
    const res = ['c', 'd'].find(row => key === row);
    if(res){
      a.e[0][`${key}`] = a[key];
      delete a[`${key}`];
    }
  });
});
console.log(arr1);
console.log(arr1[0].e);



db.user.insert({
   "contact": "987654321",
   "dob": "01-01-1991",
   "name": "Tom Benzamin",
   "address": [
      {
         "building": "22 A, Indiana Apt",
         "pincode": 123456,
         "city": "Los Angeles",
         "state": "California"
      },
      {
         "building": "170 A, Acropolis Apt",
         "pincode": 456789,
         "city": "Chicago",
         "state": "Illinois"
      }]
});