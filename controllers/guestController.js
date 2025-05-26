const sessionService = require('../services/sessionService');
const ticketService = require('../services/ticketService');


async function listSessions(req, res, next) {
    try {
        const sessions = await sessionService.getAllSessions();
        res.render('guest/sessions', {sessions});
    } catch (error) {
        console.error('Помилка отримання сеансів:', error);
        res.status(500).render('error', {message: 'Ми наїбнулись і не змогли витягнуть список сеансів. Бекендер буде покараний.'});
    }
}

async function sessionDetails(req, res, next) {
    try {
        const {id} = req.params;

        const session = await sessionService.getSessionById(id);
        res.render('guest/sessionDetails', {session});
        /*
        const sessionId = req.params.id;
        const session = await sessionService.getSessionById(sessionId); // session включає session.seats

        // Групуємо місця по рядах
        const seatsByRows = {};

        session.seats.forEach(seat => {
            if (!seatsByRows[seat.row]) {
                seatsByRows[seat.row] = [];
            }
            seatsByRows[seat.row].push(seat.seat_number);
        });

        // Впорядковуємо ряди і номери місць
        const rows = Object.keys(seatsByRows)
            .sort((a, b) => a - b)
            .map(rowNumber => ({
                rowNumber,
                seats: seatsByRows[rowNumber].sort((a, b) => a - b)
            }));

        const today = new Date();

        const availableDates = Array.from({ length: 14 }, (_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            return date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long'
            });
        });

        res.render('guest/sessionDetails', {
            session,
            rows,
            dates: availableDates
        });
*/
    } catch (error) {
        console.error('Помилка при перегляді сеансу. ', error);
        res.status(500).render('error', {message: 'Ми наїбнулись і не найшли цей фільм. Ми звільняємо бекендера.'})
    }
}

async function orderTicket(req, res, next) {
    try {
        const {session_id, seat_id} = req.body;

        if (!session_id || !seat_id) {
            return res.status(400).render('error', {message: 'Відсутні необхідні параметри замовлення.'});
        }

        const result = await ticketService.orderTicket(session_id, seat_id);

        if (result.success) {
            res.render('guest/orderTicket', {ticket: result.data});
        } else {
            res.status(400).render('error', {message: result.error || 'Не вдалося оформити замовлення.'});
        }
    } catch (error) {
        console.error('Помилка при оформленні замовлення:', error);
        res.status(500).render('error', {message: 'Внутрішня помилка сервера. Спробуйте пізніше.'});
    }
}


module.exports = {
    listSessions,
    sessionDetails,
    orderTicket,
};