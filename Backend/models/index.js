const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const config    = require(__dirname + '/../config/config.js').development;

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

const db = {};
fs
    .readdirSync(__dirname)
    .filter(file => file !== 'index.js' && file.endsWith('.js'))
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(name => {
    if (db[name].associate) {
        db[name].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
