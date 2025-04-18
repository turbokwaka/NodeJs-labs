const { poolPromise } = require('../databases/db');

async function getAllMovies() {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM movies');
        return result.recordset;
    } catch (err) {
        console.error('DB Error:', err);
        throw err;
    }
}

module.exports = { getAllMovies };
