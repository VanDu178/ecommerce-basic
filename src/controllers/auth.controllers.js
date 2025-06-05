const User = require("../models/user.model");
const register = (req, res) => {
  res.json({ message: "register success" });
};

const login = (req, res) => {
  res.json({ message: "login success!" });
};

module.exports = {
  register,
  login,
};
