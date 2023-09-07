const express = require("express");
const router = express.Router();

const userController = require("../controller/user");
const checkAuth = require("../middleware/check-auth");

router.post("/signup", userController.createNewUser);

router.post("/login", userController.getIntoLogin);

router.delete("/:userid", checkAuth, userController.deleteUser);

module.exports = router;
