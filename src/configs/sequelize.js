const Sequelize = require('Sequelize');
const dbConfig  = require('./database');

const sequelize = new Sequelize(dbConfig);

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;