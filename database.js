import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST_BOOK,
    user: process.env.MYSQL_USER_BOOK,
    password: process.env.MYSQL_PASS_BOOK,
    database: process.env.MYSQL_DATABASE_BOOK
}).promise()

export default pool;