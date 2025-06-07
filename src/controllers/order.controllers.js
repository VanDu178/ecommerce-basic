const Order = require("../models/order.model");
const validStatuses = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId");
    return res.status(200).json({ message: "Danh sách orders", orders });
  } catch (err) {
    return res.status(500).json({ message: "Đã xảy ra lỗi", err: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const id = req.params;
    const order = await Order.findById(id).populate("userId");
    if (!order) {
      return res.status(404).json({ message: "Order không tồn tại" });
    }
    return res.status(200).json({ message: "Thông tin order", order });
  } catch (err) {
    return res.status(500).json({ message: "Đã xảy ra lỗi", err: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const status = req.body;
    const id = req.params;
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Status không tồn tại" });
    }
    const updatedOrder = await Order.findByIdAndUpdate(id, status, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order không tồn tại" });
    }
    return res.status(200).json({
      message: "Cập nhật trạng thái order thành công",
      order: updatedOrder,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra", err: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: "Order không tồn tại" });
    }
    return res.status(200).json({ message: "Xóa order thành công" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra", err: err.message });
  }
};

module.exports = {
  getAllOrder,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
