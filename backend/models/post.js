const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: String,
  userId: String,
  content: String,
  createdAt: Date,
  // likes: Number,
  // comments: [
  //   {
  //     _id: String,
  //     userId: String,
  //     content: String,
  //     createdAt: Date,
  //   },
  // ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
