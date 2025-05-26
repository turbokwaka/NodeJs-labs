const {poolPromise} = require('../databases/db');

async function getAllSessions() {
    try {
        // Отримуємо дані з API за допомогою fetch
        const sessionsResponse = await fetch('http://localhost:1337/api/sessions'); // замініть на реальний URL

        if (!sessionsResponse.ok) {
            throw new Error(`HTTP помилка! Статус: ${sessionsResponse.status}`);
        }

        const sessionsData = await sessionsResponse.json();
        console.log(sessionsData.data);

        const enrichedSessions = [];

        for (session of sessionsData.data) {
            let movieResponse = await fetch('http://localhost:1337/api/movies/' + session["movie_id"]);
            let movieData = await movieResponse.json();

            let enrichedSession = {
                ...session,
                "title": movieData["title"],
                "genre": movieData["genre"],
            }

            enrichedSessions.push(enrichedSession);
        }

        return enrichedSessions;
    } catch (err) {
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
    deleteSession
};
