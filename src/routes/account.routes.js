const express = require("express");
const router = express.Router();
const {
  accounts,
  lockAccount,
  unlockAccount,
} = require("../controllers/account.controllers");
router.get("/", accounts);
router.post("/lock/:id", lockAccount);
router.post("/unlock/:id", unlockAccount);

module.exports = router;
