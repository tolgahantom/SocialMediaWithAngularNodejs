const Post = require("../models/post");
const { v4: uuidv4 } = require("uuid");

module.exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "users",
        },
      },
    ]).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const post = new Post({
      _id: uuidv4(),
      userId: userId,
      content: content,
      createdAt: new Date(),
    });

    await post.save();
    res.json({ message: "Post shared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
