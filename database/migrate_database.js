require('dotenv').config();
const mysql = require('mysql');
const db = require('./db_connection');

const create_users = require('./migrations/create_users.js');
const create_products = require('./migrations/create_products');
const create_orders = require('./migrations/create_orders');

console.log(create_users);
db.query(create_users);

console.log(create_products);
db.query(create_products);

console.log(create_orders);
db.query(create_orders);