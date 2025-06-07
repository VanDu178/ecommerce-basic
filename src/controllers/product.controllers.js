const { default: mongoose } = require('mongoose');
const Product = require('../models/product.model');

const getAllProducts = async (req, res) => {
    const products = await Product.find();
    // Logic to retrieve all products from the database
    res.status(200).json({ message: "All products retrieved successfully", products });
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

module.exports = {
    getAllProducts,
    getProductById,
};
