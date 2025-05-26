const sessionService = require('../services/sessionService');

async function listSessions(req, res, next) {
    try {
        const sessions = await sessionService.getAllSessions();
        res.render('admin/sessions', {sessions});
    } catch (error) {
        console.error('Помилка отримання сеансів:', error);
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
async function showEditSession(req, res, next) {
    try {
        const session = await sessionService.getSessionById(req.params.id);
        if (!session) {
            return res.status(404).render('error', {message: 'Сеанс не знайдено.'});
        }
        res.render('admin/editSession', {session});
    } catch (error) {
        console.error('Помилка відображення форми редагування:', error);
        res.status(500).render('error', {message: 'Внутрішня помилка сервера.'});
    }
}

/**
 * Обробка оновлення сесії
 */
async function updateSession(req, res, next) {
    try {
        const updatedData = req.body;
        const result = await sessionService.updateSession(req.params.id, updatedData);
        if (result.error) {
            return res
                .status(400)
                .render('error', {message: result.error});
        }
        res.redirect('/admin/sessions');
    } catch (error) {
        console.error('Помилка редагування сеансу:', error);
        res.status(500).render('error', {message: 'Внутрішня помилка сервера.'});
    }
}

/**
 * Видалення сесії
 */
async function deleteSession(req, res, next) {
    try {
        const result = await sessionService.deleteSession(req.params.id);
        if (result.error) {
            return res.status(400).render('error', {message: result.error});
        }
        res.redirect('/admin/sessions');
    } catch (error) {
        console.error('Помилка видалення сеансу:', error);
        res.status(500).render('error', {message: 'Внутрішня помилка сервера.'});
    }
}

module.exports = {
    listSessions,
    showCreateSession,
    createSession,
    showEditSession,
    updateSession,
    deleteSession,
};
