const express = require("express");
const router = express.Router();

const { createCategory } = require("../controllers/category.controllers");

router.post("/categories", createCategory);

module.exports = router;
