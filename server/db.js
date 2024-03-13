const Pool = require('pg').Pool;
require('dotenv').config();


const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'todoapp'
})


pool.connect((err) => {
    if(err) throw err
    console.log("connected to PostgreSQL successfully")
})

module.exports = pool