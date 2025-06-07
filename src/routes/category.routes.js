const express = require("express");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();

const {
  getAllCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controllers");

router.get("/", getAllCategory);
router.post("/", createCategory);
router.get("/:id", validateObjectId, getCategoryById);
router.put("/:id", validateObjectId, updateCategory);
router.delete("/:id", validateObjectId, deleteCategory);
module.exports = router;
