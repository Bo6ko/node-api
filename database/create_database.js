require('dotenv').config();
var mysql = require('mysql');

const sql = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} CHARACTER SET utf8 COLLATE utf8_general_ci`;
console.log(sql);
mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})
.query(sql);