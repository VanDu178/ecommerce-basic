const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
    select: false, //mặc định khi lấy thông tin không lấy trường mật khẩu
  },
  isBan: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.comparePassword = async (password) => {
  return this.password === password;
};

module.exports = mongoose.model("User", userSchema);
