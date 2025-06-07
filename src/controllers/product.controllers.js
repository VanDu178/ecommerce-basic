const { default: mongoose } = require("mongoose");
const Product = require("../models/product.model");
const Category = require("../models/category.model");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // Logic to retrieve all products from the database
    return res
      .status(200)
      .json({ message: "All products retrieved successfully", products });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra", err: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product retrieved successfully", product });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra", err: err.message });
  }
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
    return res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra", err: err.message });
  }
};

//Cách viết theo promise thay vì dùng asyn/await
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, categoryId, price, description } = req.body;

  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(400).json({ message: "Sản phẩm không tồn tại" });
      }

      if (categoryId !== undefined) {
        return Category.findById(categoryId).then((category) => {
          if (!category) {
            return res.status(400).json({ message: "Danh mục không tồn tại" });
          }
          product.categoryId = categoryId;
          return Promise.resolve(product);
        });
      }

      return Promise.resolve(product);
    })
    .then((product) => {
      if (name !== undefined) product.name = name;
      if (price !== undefined) product.price = price;
      if (description !== undefined) product.description = description;
      return product.save();
    })
    .then((updatedProduct) => {
      res.status(200).json({
        message: "Chỉnh sửa sản phẩm thành công",
        product: updatedProduct,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Đã có lỗi xảy ra", error: err.message });
    });
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productDel = await Product.findByIdAndDelete(id);
    if (!productDel) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    return res
      .status(200)
      .json({ message: "Xóa sản phẩm thành công", productDel });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra", err: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
