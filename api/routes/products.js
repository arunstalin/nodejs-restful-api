const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Product = require("../models/product");
const checkAuth = require("../middleware/check-auth");
const productController = require("../controller/products");

router.get("/", productController.getAllProducts);

router.get("/:productid", productController.getProduct);

router.post("/", checkAuth, productController.saveProduct);

router.patch("/:productid", checkAuth, productController.updateProduct);

router.delete("/:productid", checkAuth, productController.deleteProduct);

module.exports = router;
