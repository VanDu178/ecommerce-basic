const User = require("../models/user.model");

const register = (req, res) => {
  console.log("da vao duoc day");
  const { username, password, email } = req.body;
  console.log("Registering user:", username);
  console.log("Password:", password);
  console.log("Email:", email);
  const newUser = new User({
    username,
    password,
    email,
  });
  newUser
    .save()
    .then((user) => {
      res.status(201).json({ message: "User registered successfully", user });
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ message: "Error creating user", error: error.message });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  console.log("Logging in user with email:", email);
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.password != password) {
        return res.status(401).json({ message: "Invalid password" });
      }
      res.status(200).json({ message: "User logged in successfully", user });
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res
        .status(500)
        .json({ message: "Error finding user", error: error.message });
    });
};

module.exports = {
  register,
  login,
};
