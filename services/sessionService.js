const db = require('../db'); // Підключення до БД

async function getAllSessions() {
    const result = await db.query(`
    SELECT sessions.*, movies.title, movies.genre
    FROM sessions
    JOIN movies ON sessions.movie_id = movies.id
    ORDER BY start_time
  `);
    return result.recordset;
}
async function getSessionById(id) {
    const result = await db.query(`
    SELECT * FROM sessions WHERE id = @id
  `, { id });

    if (result.recordset.length === 0) {
        throw new Error('Сеанс не знайдено');
    }

    return result.recordset[0];
}
async function createSession(data) {
    const { movie_id, start_time, hall_name, total_seats, background_image_url } = data;
    await db.query(`
    INSERT INTO sessions (movie_id, start_time, hall_name, total_seats, background_image_url)
    VALUES (@movie_id, @start_time, @hall_name, @total_seats, @background_image_url)
  `, data);
}
async function updateSession(id, data) {
    const { start_time, hall_name, total_seats, background_image_url } = data;
    await db.query(`
    UPDATE sessions
    SET start_time = @start_time, hall_name = @hall_name, total_seats = @total_seats, background_image_url = @background_image_url
    WHERE id = @id
  `, { ...data, id });
}
async function deleteSession(id) {
    await db.query(`DELETE FROM sessions WHERE id = @id`, { id });
}