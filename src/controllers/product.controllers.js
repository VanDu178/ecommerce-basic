const { default: mongoose } = require("mongoose");
const Product = require("../models/product.model");
const Category = require("../models/category.model");

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  // Logic to retrieve all products from the database
  res
    .status(200)
    .json({ message: "All products retrieved successfully", products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id) === false) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ message: "Product retrieved successfully", product });
};

const createProduct = async (req, res) => {
  try {
    const { name, categoryId, price, description } = req.body;
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Sản phẩm đã tồn tại" });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Loại sản phẩm không tồn tại" });
    }
    const newProduct = new Product({
      name,
      categoryId: category._id,
      price,
      description,
    });

    await newProduct.save();
    return res.status(201).json({ message: "Sản phẩm được tạo thành công" });
  } catch (err) {
    return res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
