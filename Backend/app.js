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
        const sessionId = req.body.session_id;
        const seatIds = req.body.seat_id;
        const userData = req.body.user;
        const paymentInfo = req.body.payment;

        const result = await orderTickets({
            sessionId,
            seatIds,
            userData,
            paymentInfo
        });

        res.status(201).json(result);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 1335;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
