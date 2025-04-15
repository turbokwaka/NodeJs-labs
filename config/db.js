const sql = require('mssql');

const config = {
    user: 'your_user',
    password: 'your_password',
    server: 'localhost',
    database: 'cinema',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function query(queryString, params = {}) {
    const pool = await sql.connect(config);
    const request = pool.request();
    for (const key in params) {
        request.input(key, params[key]);
    }
    const result = await request.query(queryString);
    return result;
}

module.exports = { query };