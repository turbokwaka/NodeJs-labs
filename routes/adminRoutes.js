const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// CRUD для сесій
router.get('/admin/sessions', adminController.listSessions);
router.get('/admin/sessions/create', adminController.showCreateSession);
router.post('/admin/sessions', adminController.createSession);
router.get('/admin/sessions/:id/edit', adminController.showEditSession);
router.post('/admin/sessions/:id', adminController.updateSession);
router.post('/admin/sessions/:id/delete', adminController.deleteSession);

module.exports = router;
