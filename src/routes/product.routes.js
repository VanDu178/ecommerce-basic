const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
} = require("../controllers/product.controllers");

router.get("/getAllProducts", getAllProducts);
router.get("/getAllProducts/:id", getProductById);
router.post("/createProduct", createProduct);

module.exports = router;
