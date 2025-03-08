var express = require('express');
var router = express.Router();

const users = [
  { id: 1, name: "Тараненко Артем", description: "Работнік  Binotel LLC. Дуже потужний працівник посада:я не помню!" , img: "/images/gif.gif"},
  { id: 2, name: "Навроцький Максим", description: "Работнік City24. Майже потужний аналітік віділу фінансуванні і підтримки!" , img: "/images/gif_max.gif"},
  { id: 3, name: "Суліма Лілія", description: "Работнік: Сижу дома мені добре!" , img: "/images/gif_liliia.gif"},
  { id: 4, name: "Долинко Олександр", description: "Работнік: Стіпуха кормить!!!" , img: "/images/gif_sasha.gif"}
];

/* Сторінка учасника */
router.get('/:id', function(req, res) {
  const user = users.find(m => m.id == req.params.id);
  console.log(user);

  if (user) {
    res.render('user', { title: 'Учасник', user });
  } else {
    res.status(404).send('Учасник не знайдений');
  }
});

module.exports = router;
