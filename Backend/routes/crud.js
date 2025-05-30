const { Op } = require('sequelize');

module.exports = function(model) {
    const router = require('express').Router();

    router.get('/', async (req, res) => {
        const { page = 1, pageSize = 10, ...filters } = req.query;
        const where = {};
        Object.entries(filters).forEach(([k,v]) => { where[k] = { [Op.eq]: v }; });

        try {
            const { count, rows } = await model.findAndCountAll({
                where,
                limit: +pageSize,
                offset: (+page - 1) * +pageSize
            });
            res.json({ total: count, page: +page, pageSize: +pageSize, data: rows });
        } catch(err) {
            res.status(500).json({ error: err.message });
        }
    });

    router.get('/:id', async (req, res) => {
        const rec = await model.findByPk(req.params.id);
        if (!rec) return res.sendStatus(404);
        res.json(rec);
    });

    router.post('/', async (req, res) => {
        const t = await model.sequelize.transaction();
        try {
            const rec = await model.create(req.body, { transaction: t });
            await t.commit();
            res.status(201).json(rec);
        } catch(err) {
            await t.rollback();
            res.status(400).json({ error: err.message });
        }
    });

    router.put('/:id', async (req, res) => {
        const t = await model.sequelize.transaction();
        try {
            const moment = require('moment');

            const [updated] = await model.update(req.body, {
                where: { id: req.params.id },
                transaction: t
            });
            if (!updated) {
                try {
                    await t.rollback(); return res.sendStatus(404);
                } catch(err) {
                    res.status(500).json({ error: err.message });
                }
            }
            await t.commit();
            res.sendStatus(204);
        } catch(err) {
            await t.rollback();
            res.status(400).json({ error: err.message });
        }
    });

    router.delete('/:id', async (req, res) => {
        const t = await model.sequelize.transaction();
        try {
            const deleted = await model.destroy({
                where: { id: req.params.id },
                transaction: t
            });
            if (!deleted) { await t.rollback(); return res.sendStatus(404); }
            await t.commit();
            res.sendStatus(204);
        } catch(err) {
            await t.rollback();
            res.status(400).json({ error: err.message });
        }
    });

    return router;
};
