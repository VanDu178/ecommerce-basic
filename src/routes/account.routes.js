const express = require("express");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();
const {
  accounts,
  detail,
  update,
  banAccount,
  unBanAccount,
} = require("../controllers/account.controllers");
router.get("/", accounts);
router.get("/:id", validateObjectId, detail);
router.put("/:id", validateObjectId, update);
router.post("/ban/:id", validateObjectId, banAccount);
router.post("/unban/:id", validateObjectId, unBanAccount);

module.exports = router;
