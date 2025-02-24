var express = require('express');
var router = express.Router();

const members = [
  { id: 1, name: "Ім'я Учасника 1", description: "Опис учасника 1" },
  { id: 2, name: "Ім'я Учасника 2", description: "Опис учасника 2" },
  { id: 3, name: "Ім'я Учасника 3", description: "Опис учасника 3" }
];

/* Сторінка учасника */
router.get('/:id', function(req, res) {
  const member = members.find(m => m.id == req.params.id);
  if (member) {
    res.render('member', { title: 'Учасник', member });
  } else {
    res.status(404).send('Учасник не знайдений');
  }
});

module.exports = router;
