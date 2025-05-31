const express = require('express');
const router = express.Router();
const adminSessionController = require('../controllers/adminSessionController');
const adminTicketController = require('../controllers/adminTicketController');

// CRUD для сесій
router.get('/admin/sessions', adminSessionController.listSessions);
router.get('/admin', adminSessionController.listSessions);
router.get('/admin/sessions/create', adminSessionController.showCreateSession);
router.get('/admin/sessions/:id/edit', adminSessionController.showEditSession);

router.get('/admin/tickets', adminTicketController.listTickets);
router.get('/admin/tickets/:id/edit', adminTicketController.showEditTicket);

module.exports = router;
