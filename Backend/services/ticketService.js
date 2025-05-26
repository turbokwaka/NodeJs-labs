const { sequelize, Seat, Ticket, Payment } = require('../models');

async function orderTickets({ sessionId, seatIds, userData, paymentInfo }) {
    return await sequelize.transaction(async t => {

        const seats = await Seat.findAll({
            where: { id: seatIds, session_id: sessionId },
            transaction: t,
            lock: t.LOCK.UPDATE
        });
        if (seats.length !== seatIds.length) {
            throw new Error('One or more seats unavailable');
        }

        const tickets = await Promise.all(seatIds.map(id =>
            Ticket.create({
                session_id: sessionId,
                seat_id: id,
                status: 'reserved',
                guest_name: userData.name,
                guest_email: userData.email
            }, { transaction: t })
        ));

        const payment = await Payment.create({
            ticket_id: tickets[0].id,
            method: paymentInfo.method,
            status: 'pending',
            amount: paymentInfo.amount
        }, { transaction: t });

        return { tickets, payment };
    });
}

module.exports = { orderTickets };
