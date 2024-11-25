const mysql=require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

const connectionOptions = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
    ssl: {
        ca: fs.readFileSync('./databases/certs/DigiCertGlobalRootG2.crt.pem'),
        rejectUnauthorized: false
    }
};

const pool = mysql.createPool(connectionOptions);

const connectToMySQL = async () => {
    try {
        await pool.getConnection();

        console.log('MySQL database connected!');
    } catch (err) {
        console.log('MySQL database connection error!');

        process.exit(1);
    }
};

connectToMySQL().then();

module.exports = pool;