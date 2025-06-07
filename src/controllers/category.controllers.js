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

module.exports = {
  createCategory,
};
