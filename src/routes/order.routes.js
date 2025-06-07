const express = require("express");
const router = express.Router();
const {
  getAllOrder,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/order.controllers");

router.get("/", getAllOrder);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;
