const ticketService = require('../services/ticketService');

async function listTickets(req, res, next) {
    try {
        const tickets = await ticketService.getAllTickets();
        console.log(tickets);
        res.render('admin/tickets', {tickets});
    } catch (error) {
        console.error('Помилка отримання квитків:', error);
        res.status(500).render('error', {message: 'Внутрішня помилка сервера'});
    }
}

/**
 * Форма створення нової сесії
 */
function showCreateSession(req, res) {
    res.render('admin/createSession');
}

/**
 * Обробка створення нової сесії
 */
async function createSession(req, res, next) {
    try {
        const sessionData = req.body;
        await sessionService.createSession(sessionData);
        res.redirect('admin/sessions');
    } catch (error) {
        console.error('Помилка створення сеансу:', error);
        res
            .status(400)
            .render('error', {message: 'хуйня трапляється'});
    }
}

/**
 * Форма редагування існуючої сесії
 */
async function showEditTicket(req, res, next) {
    try {
        const ticket = await ticketService.getTicketById(req.params.id);
        console.log(ticket);
        if (!ticket) {
            return res.status(404).render('error', {message: 'Квиток не знайдено.'});
        }
        res.render('admin/editTicket', {ticket});
    } catch (error) {
        console.error('Помилка відображення форми редагування:', error);
        res.status(500).render('error', {message: 'Внутрішня помилка сервера.'});
    }
}

module.exports = {
    listTickets,
    createSession,
    showEditTicket,
};
