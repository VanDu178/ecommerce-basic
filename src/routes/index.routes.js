const express = require("express");
const router = express.Router();
const authRoute = require("./auth.routes");
const productRoute = require("./product.routes");
const accountRoute = require("./account.routes");
const categoryRoute = require("./category.routes");
const orderRoute = require("./order.routes");

router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/accounts", accountRoute);
router.use("/categories", categoryRoute);
router.use("/orders", orderRoute);

module.exports = router;
