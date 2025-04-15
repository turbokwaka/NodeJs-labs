const sql = require('mssql');

const config = {
    user: '',
    password: '',
    server: '',
    database: '',
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
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
