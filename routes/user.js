const express = require("express");

const { createUser } = require("../controllers/createUser");
const { getUser } = require("../controllers/getUser");

const router = express.Router();
router.route("/user").get(getUser).post(createUser);

module.exports = router;
