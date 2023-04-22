const { Sequelize } = require("sequelize");

const dbConfig = require("../../../db/config");
const dotenv = require("dotenv");

dotenv.config({ path: `.env.local` });

const db = {};

const sequelize = new Sequelize(dbConfig.url, {
  ...dbConfig,
});

db.users = require("../models/user").model(sequelize, Sequelize.DataTypes);
db.userDetails = require("../models/userDetails").model(
  sequelize,
  Sequelize.DataTypes
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize;

module.exports = db;
