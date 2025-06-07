const mongoose = require("mongoose");

const validateOnjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Id không hợp lệ" });
  }
  next();
};

module.exports = validateOnjectId;
