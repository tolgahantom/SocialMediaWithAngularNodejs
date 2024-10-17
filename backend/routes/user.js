const express = require("express");
const router = express.Router();
const upload = require("../services/upload.service");
const userController = require("../controllers/user");

// http/localhost/5000/api
router.post("/register", upload.single("avatar"), userController.register);
router.post("/login", userController.login);

module.exports = router;
