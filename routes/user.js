var express = require('express');
var router = express.Router();

const users = [
  { id: 1, name: "Тараненко Артем", description: "Опис учасника 1" , img: "/images/gif.gif"},
  { id: 2, name: "Навроцький Максим", description: "Опис учасника 2" , img: "/images/gif_max.gif"},
  { id: 3, name: "Суліма Лілія", description: "Опис учасника 3" , img: "/images/gif_liliia.gif"},
  { id: 4, name: "Долинко Олександр", description: "Опис учасника 4" , img: "/images/gif_sasha.gif"}
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
