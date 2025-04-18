async function orderTicket(sessionId, seatId) {
    // Перевірка чи місце існує
    const seatCheck = await db.query(`
    SELECT * FROM seats WHERE id = @seatId AND session_id = @sessionId
  `, { sessionId, seatId });

    if (seatCheck.recordset.length === 0) {
        throw new Error('Місце не існує');
    }

    // Перевірка чи не зайняте
    const ticketCheck = await db.query(`
    SELECT * FROM tickets WHERE seat_id = @seatId AND session_id = @sessionId AND status = 'confirmed'
  `, { sessionId, seatId });

    if (ticketCheck.recordset.length > 0) {
        throw new Error('Місце вже зайняте');
    }

    // Замовлення
    await db.query(`
    INSERT INTO tickets (session_id, seat_id, status)
    VALUES (@sessionId, @seatId, 'confirmed')
  `, { sessionId, seatId });
}