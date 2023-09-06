const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const signupRoutes = require("./api/routes/user");

const dbURI = `mongodb+srv://arunstalin:${process.env.MONGO_DB_PWD}@node-rest-api.bxyzsha.mongodb.net/products?retryWrites=true&w=majority`;

const intialDbConnection = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    console.error(error);
  }
};

intialDbConnection();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", signupRoutes);

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: "It Works"
//     })
// });

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
