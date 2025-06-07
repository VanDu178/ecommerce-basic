const express = require("express");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controllers");

router.get("/getAllProducts", getAllProducts);
router.post("/createProduct", createProduct);
router.get("/getAllProducts/:id", validateObjectId, getProductById);
router.put("/updateProduct/:id", validateObjectId, updateProduct);
router.delete("/deleteProduct/:id", validateObjectId, deleteProduct);

module.exports = router;
