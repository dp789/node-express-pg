const db = require("../drivers/models/index");

const createUserDetails = async ({ id, email, secondName, ip }) =>
  db.userDetails.create({ id, email, secondName, ip });

module.exports = createUserDetails;
