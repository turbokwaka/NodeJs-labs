const express = require('express');
const router = express.Router(); // додано
const guestController = require('../controllers/guestController');

router.get('/movies', guestController.showMovies);

module.exports = router;
