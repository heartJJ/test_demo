const loki = require('lokijs');

const db = new loki('example.db');

const users = db.addCollection('users');

users.insert([{ name: 'Thor', age: 35 }, { name: 'Loki', age: 30 }]);

users.removeWhere({  name: 'Loki' });

const r = users.find({});


console.log(r);
