const express = require("express");
const router = express.Router();
const authRoute = require("./auth.routes");
const productRoute = require("./product.routes");

router.use("/auth", authRoute);
router.use("/products", productRoute);

module.exports = router;
