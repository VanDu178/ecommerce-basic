const Category = require("../models/category.model");

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const exitingCategory = await Category.findOne({ name });
    if (exitingCategory) {
      return res.status(400).json({ message: "Tên loại sản phẩm đã toàn tai" });
    }
    const newCategory = new Category({ name, description });
    await newCategory.save();
    return res.status(201).json({ message: "Loại sản phẩm tạo thành công" });
  } catch (err) {
    return res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ message: "Danh sách category", categories });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra", err: err.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category không tồn tại" });
    }
    return res.status(200).json({ message: "Chi tiết category", category });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra", err: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category không tồn tại" });
    }
    return res
      .status(200)
      .json({ message: "Category cập nhật thành công", updatedCategory });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra", err: err.message });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deleteCategory) {
      return res.status(404).json({ message: "Category không tồn tại" });
    }
    return res
      .status(200)
      .json({ message: "Đã xóa category thành công", deleteCategory });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra", err: err.message });
  }
};
module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
