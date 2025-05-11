const sessionService = require('../services/sessionService');
const ticketService = require('../services/ticketService');

async function listSessions(req, res, next) {
    try {
        const sessions = await sessionService.getAllSessions();
        res.render('guest/sessions', {sessions});
    } catch (error) {
        console.error('Помилка отримання сеансів:', error);
        res.status(500).render('error', {message: 'Внутрішня помилка сервера'});
    }
}

async function sessionDetails(req, res, next) {
    try {
        const {id} = req.params;

        const session = await sessionService.getSessionById(id);
        res.render('guest/sessionDetails', {session});
    } catch (error) {
        console.error('Помилка при перегляді сеансу. ', error);
        res.status(500).render('error', {message: 'Помилка сервера. Спробуйте пізніше'})
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