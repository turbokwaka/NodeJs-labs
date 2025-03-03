var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) { const users = [
  { name: "Максим Навроцький", role: "Junior Database Analyst", company: "City 24" },
  { name: "Тараненко Артем", role: "Головний консультант", company: "БРО ВЕДИ САМ Я НЕ ШАРЮ))" },
  { name: "Суліма Лілія", role: "Майбутній Full-Stack розробник", skills: ["Web Design", "Frontend", "Backend"] },
  { name: "Долинко Саша", role: "Експерт у робототехніці", skills: ["Радіо системи", "Embedded Systems", "Automation"] }
];

  res.render('users', { title: "Наша команда", users });
});
module.exports = router;
