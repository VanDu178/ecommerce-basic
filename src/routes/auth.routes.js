const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controllers");
const { authenticateToken } = require("../middleware/jwt.middleware");

router.get("/register", authenticateToken, register);
router.get("/login", login);

module.exports = router;
