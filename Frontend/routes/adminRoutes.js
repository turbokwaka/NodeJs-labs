const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminSessionController');

// CRUD для сесій
router.get('/admin/sessions', adminController.listSessions);
router.get('/admin/sessions/create', adminController.showCreateSession);
router.post('/admin/sessions', adminController.createSession);
router.get('/admin/sessions/:id/edit', adminController.showEditSession);
router.post('/admin/sessions/:id', adminController.updateSession);
router.post('/admin/sessions/:id/delete', adminController.deleteSession);

router.get('/admin/tickets', adminController.listSessions);
router.get('/admin/tickets/create', adminController.showCreateSession);
router.post('/admin/tickets', adminController.createSession);
router.get('/admin/tickets/:id/edit', adminController.showEditSession);
router.post('/admin/tickets/:id', adminController.updateSession);
router.post('/admin/tickets/:id/delete', adminController.deleteSession);

module.exports = router;
