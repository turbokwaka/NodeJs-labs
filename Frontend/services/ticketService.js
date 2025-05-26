const {poolPromise} = require('../databases/db');

async function orderTicket(sessionId, seatId) {
    try {
        const pool = await poolPromise;

        const seatCheck = await pool.request()
            .input('sessionId', sessionId)
            .input('seatId', seatId)
            .query(`
                SELECT * FROM seats 
                WHERE id = @seatId AND session_id = @sessionId
            `);

        if (seatCheck.recordset.length === 0) {
            throw new Error('Місце не існує');
        }

        const ticketCheck = await pool.request()
            .input('sessionId', sessionId)
            .input('seatId', seatId)
            .query(`
                SELECT * FROM tickets 
                WHERE seat_id = @seatId AND session_id = @sessionId AND status = 'confirmed'
            `);

        if (ticketCheck.recordset.length > 0) {
            throw new Error('Місце вже зайняте');
        }

        await pool.request()
            .input('sessionId', sessionId)
            .input('seatId', seatId)
            .query(`
                INSERT INTO tickets (session_id, seat_id, status)
                VALUES (@sessionId, @seatId, 'confirmed')
            `);
    } catch (err) {
        console.error('DB Error:', err);
        throw err;
    }
}

module.exports = {orderTicket};
