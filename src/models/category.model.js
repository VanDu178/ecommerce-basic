const mongoose = require("mongoose");
const Product = require("../models/product.model");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
});

categorySchema.pre(
  ["findOneAndDelete", "findByIdAndDelete"],
  async function (next) {
    const categoryBeingDeleted = await this.model.findOne(this.getFilter());
    if (categoryBeingDeleted) {
      await Product.deleteMany({ categoryId: categoryBeingDeleted._id });
    }
    next();
  }
);

module.exports = mongoose.model("Category", categorySchema);
