const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.mode");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User(sequelize, Sequelize.DataTypes);

module.exports = db;
