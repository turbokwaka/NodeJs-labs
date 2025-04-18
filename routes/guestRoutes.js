const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');

router.get('/', guestController.listSessions);        // Перегляд всіх сеансів
router.get('/sessions/:id', guestController.sessionDetails);     // Перегляд конкретного сеансу
router.post('/order', guestController.orderTicket);              // Замовлення квитка

module.exports = router;
