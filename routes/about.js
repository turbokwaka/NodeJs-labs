var express = require('express');
var router = express.Router();

var members = [
    "Навроцький Максим",
    "Тараненко Артем",
    "Долинко Олександр",
    "Суліма Лілія"
];

router.get('/', function(req, res, next) {
    res.render('about', { title: 'Наша бригада', members: members });
});

module.exports = router;