const User = require("../models/user.model");

const accounts = async (req, res) => {
  //lay tat ca accounts trong database
  await User.find()
    .then((data) => {
      res.status(200).json({
        data,
        message: "Danh sách account trong hệ thống",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Đã có lỗi xảy ra" });
    });
};

const lockAccount = async (req, res) => {
  const { id } = req.params;
  await User.findById(id).then((account) => {
    if (!account) {
      res.status(404).json({ message: "Không tìm thấy user" });
    }
    account.isBan = true;
    account.save();
  });
};

const unlockAccount = (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    id,
    message: "edasd",
  });
};

module.exports = {
  accounts,
  lockAccount,
  unlockAccount,
};
