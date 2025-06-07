const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/product.controllers");

router.get("/getAllProducts", getAllProducts);
router.post("/createProduct", createProduct);
router.get("/getAllProducts/:id", getProductById);
router.put("/editProduct/:id", editProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
