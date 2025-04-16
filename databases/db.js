const path = require("node:path");

require('dotenv').config({ path: path.join(__dirname, '../.env') });
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 1433,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST === 'true'
  }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('MSSQL connected');
        return pool;
    })
    .catch(err => {
        console.error('DB connection failed:', err);
    });

module.exports = { sql, poolPromise };
