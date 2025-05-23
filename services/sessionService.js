const {poolPromise} = require('../databases/db');

async function getAllSessions() {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT sessions.*, movies.title, movies.genre, movies.poster_url
            FROM sessions
            JOIN movies ON sessions.movie_id = movies.id
            ORDER BY start_time
--             SELECT * FROM movies
        `);
        return result.recordset;
    } catch (err) {
        console.error('DB Error:', err);
        throw err;
    }
}

async function getSessionById(id) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', id)
            .query(`
                SELECT * FROM sessions WHERE id = @id
--                 SELECT * FROM movies WHERE id = @id
            `);
        if (result.recordset.length !== 0) {
            return result.recordset[0];
        } else {
            throw new Error('Сеанс не знайдено');
        }
    } catch (err) {
        console.error('DB Error:', err);
        throw err;
    }
}

async function createSession(data) {
    try {
        const {movie_id, start_time, hall_name, total_seats, background_image_url} = data;
        const pool = await poolPromise;
        await pool.request()
            .input('movie_id', movie_id)
            .input('start_time', start_time)
            .input('hall_name', hall_name)
            .input('total_seats', total_seats)
            .input('background_image_url', background_image_url)
            .query(`
                INSERT INTO sessions (movie_id, start_time, hall_name, total_seats, background_image_url)
                VALUES (@movie_id, @start_time, @hall_name, @total_seats, @background_image_url)
            `);
    } catch (err) {
        console.error('DB Error:', err);
        throw err;
    }
}

async function updateSession(id, data) {
    try {
        const {start_time, hall_name, total_seats, background_image_url} = data;
        const pool = await poolPromise;
        await pool.request()
            .input('id', id)
            .input('start_time', start_time)
            .input('hall_name', hall_name)
            .input('total_seats', total_seats)
            .input('background_image_url', background_image_url)
            .query(`
                UPDATE sessions
                SET start_time = @start_time,
                    hall_name = @hall_name,
                    total_seats = @total_seats,
                    background_image_url = @background_image_url
                WHERE id = @id
            `);
    } catch (err) {
        console.error('DB Error:', err);
        throw err;
    }
}

async function deleteSession(id) {
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('id', id)
            .query(`DELETE FROM sessions WHERE id = @id`);
    } catch (err) {
        console.error('DB Error:', err);
        throw err;
    }
}

module.exports = {
    getAllSessions,
    getSessionById,
    createSession,
    updateSession,
    deleteSession
};
