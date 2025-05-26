const express    = require('express');
const bodyParser = require('body-parser');
const db         = require('./models');
const createCrud = require('./routes/crud');
const { orderTickets } = require('./services/ticketService');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Дозволити всі CORS-запити для розробки

db.sequelize.authenticate()
    .then(() => console.log(' Connected to SQL Server'))
    .catch(err => console.error(' Connection error:', err));

Object.keys(db)
    .filter(name => !['sequelize','Sequelize'].includes(name))
    .forEach(name => {
        app.use(`/api/${name.toLowerCase()}s`, createCrud(db[name]));
    });

app.post('/api/order', async (req, res) => {
    try {
        const result = await orderTickets(req.body);
        res.status(201).json(result);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 1337;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
