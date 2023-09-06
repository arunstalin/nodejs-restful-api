const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Order = require("../models/order");
const Product = require("../models/product");

router.get('/', (req, res, next) => {
    Order.find()
        .select("_id product quantity")
        .populate("product", "name,price")
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .select("name price _id")
        .populate("product")
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: "No valid entry for the provided Id"
                });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
})

router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    error: "Product not found!"
                })
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId,
                product: req.body.productId,
                quantity: req.body.quantity
            })
            return order.save();
        })
        .then(result => {
            res.status(201).json({
                message: "Added product quantity successfully",
                createdOrder: order
            })
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
})

// router.patch('/:orderId', (req, res, next) => {
//     const id = req.params.orderId;
//     const updateProds = {};
//     for (const pro of req.body) {
//         updateProds[pro.propName] = pro.value;
//     }
//     Order.findOneAndUpdate({ _id: id }, { $set: updateProds })
//         .exec()
//         .then(result => {
//             res.status(200).json(result)
//         })
//         .catch(err => {
//             res.status(500).json({ error: err });
//         })
// })

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
})

module.exports = router;
