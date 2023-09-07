const mongoose = require("mongoose");
const Product = require("../models/product");

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .select("_id name price quantity")
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.productid;
  Product.findById(id)
    .select("name price _id")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No valid entry for the provided Id",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.saveProduct = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "The given product is added successfully",
        createdProduct: product,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.updateProduct = (req, res, next) => {
  const id = req.params.productid;
  const updateProds = {};
  for (const pro of req.body) {
    updateProds[pro.propName] = pro.value;
  }
  Product.findOneAndUpdate({ _id: id }, { $set: updateProds })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.productid;
  Product.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
