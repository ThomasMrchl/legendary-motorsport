const mysql = require('mysql');
const dbConfig = require('./database.json');

const pool = mysql.createPool(dbConfig);

module.exports = pool;