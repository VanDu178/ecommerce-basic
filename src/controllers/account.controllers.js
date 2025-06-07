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

const update = async (req, res) => {
  //Cập nhật thông tin user
  try {
    const { id } = req.params;
    const { username } = req.body;
    const account = await User.findById(id);
    if (!account) {
      return res.status(404).json({ message: "Account không tồn tại" });
    }
    account.username = username || account.username;
    await account.save();
    return res
      .status(200)
      .json({ message: "Cập nhật thông tin thành công", account });
  } catch (err) {
    return res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
};

const detail = async (req, res) => {
  //Lấy thông tin chi tiết của người dùng
  try {
    const { id } = req.params;
    const account = await User.findById(id);
    if (!account) {
      return res.status(404).json({ message: "Account không tồn tại" });
    }
    return res.status(200).json({ account });
  } catch (err) {
    return res.status(500).json({ message: "Đã xảy ra lỗi", err });
  }
};

const banAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findById(id).then((account) => {
      if (!account) {
        res.status(404).json({ message: "Không tìm thấy user" });
      }
      account.isBan = true;
      account.save();
      return res.status(200).json({ message: "Khóa tài khoản thành công" });
    });
  } catch (err) {
    return res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
};

const unBanAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await User.findById(id);
    if (!account) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }
    account.isBan = false;
    res.status(200).json({
      message: "Mở khóa tài khoản thành công",
    });
  } catch (err) {
    return res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
};

module.exports = {
  accounts,
  update,
  detail,
  banAccount,
  unBanAccount,
};
