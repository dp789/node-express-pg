const { findUser } = require("../src/daos/user");

// @discription: get user by emailId GET
exports.getUser = async (req, res, next) => {
  try {
    const { email } = req.query;
    const response = await findUser({
      email,
    });
    res.status(200).send({ success: true, data: response });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
