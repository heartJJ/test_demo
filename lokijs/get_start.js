const loki = require('lokijs');

const db = new loki('example.db');

const users = db.addCollection('users');

users.insert([{ name: 'Thor', age: 35 }, { name: 'Loki', age: 30 }]);

const user1 = users.find({ age: { '$gte': 35 } });

const user2 = users.chain().find().simplesort('name').data();

console.log(user1);

console.log(user2);
