const Product = require('../models/product.model');
const getAllProducts = async (req, res) => {
    const products = await Product.find();
    // Logic to retrieve all products from the database
    res.status(200).json({ message: "All products retrieved successfully", products });
};
module.exports = {
    getAllProducts,
};
