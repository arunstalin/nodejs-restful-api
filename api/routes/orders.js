const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Order = require("../models/order");
const Product = require("../models/product");
const checkAuth = require("../middleware/check-auth");
const orderController = require("../controller/orders");

router.get("/", checkAuth, orderController.getAllOrders);

router.get("/:orderId", checkAuth, orderController.getOrder);

router.post("/", checkAuth, orderController.saveOrder);

router.delete("/:orderId", checkAuth, orderController.deleteOrder);

module.exports = router;
