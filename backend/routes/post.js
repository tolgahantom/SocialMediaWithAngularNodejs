const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");

router.get("/posts", postController.getAllPost);
router.post("/post", postController.createPost);

module.exports = router;
