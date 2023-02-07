const express = require("express");
const { createPost, likeAndUnlikePost } = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);

router.route("/post/:id").get(isAuthenticated, likeAndUnlikePost);

module.exports = router;