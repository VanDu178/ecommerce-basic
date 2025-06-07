const express = require("express");
const router = express.Router();

const { createCategory } = require("../controllers/category.controllers");

router.post("/createCategory", createCategory);

module.exports = router;
