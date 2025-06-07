const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/product.controllers');

router.get("/getAllProducts", getAllProducts);
router.get("/getAllProducts/:id", getProductById);

module.exports = router;
