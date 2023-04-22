const db = require("../drivers/models/index");

const createUser = async ({ id, name, phone, email }) =>
  db.users.create({ id, name, phone, email });

const findUser = async ({ email }) => db.users.findOne({ where: { email } });

module.exports = { createUser, findUser };
