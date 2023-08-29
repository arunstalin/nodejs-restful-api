const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Product = require("../models/product")


router.get('/', (req, res, next) => {
    console.log("Triggered GET")
    res.status(200).json({
        message: "Handling GET requests"
    })
})

router.get('/:productid', (req, res, next) => {
    const id = req.params.productid;
    if (id === 'special') {
        res.status(200).json({
            message: "Handling GET requests",
            id: id
        })
    } else {
        res.status(200).json({
            message: "You passed on ID "
        })
    }
})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    })
    product
        .save()
        .then(result => {
            console.log(error)
        })
        .catch(error => {
            console.log(error)
        })
    res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: product
    })
})

router.put('/', (req, res, next) => {

})

router.delete('/', (req, res, next) => {

})

module.exports = router;
