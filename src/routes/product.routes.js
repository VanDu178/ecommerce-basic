const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/product.controllers');

router.get("/getAllProducts", getAllProducts);

module.exports = router;
