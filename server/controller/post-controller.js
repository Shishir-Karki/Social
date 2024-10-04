


const Post = require('../models/post-model');

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const author = req.user.userID;

    if (!content) {
      return res.status(400).json({ error: "Post content is required" });
    }
    if (!author) {
      return res.status(400).json({ error: "Author ID is missing" });
    }

    const post = new Post({
      content,
      author,
    });

    await post.save();

    // Populate the author's username before returning the response
    const populatedPost = await Post.findById(post._id).populate('author', 'username');
    
    res.status(201).json({ message: "Post created successfully", post: populatedPost });
  } catch (error) {
    console.log("Error in createPost:", error);
    res.status(500).json({ error: "Server error" });
  }
};



// controllers/postController.js

exports.getPosts = async (req, res) => {
    try {
      const posts = await Post.find().populate('author', 'username');
      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };


 
exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.user.userID; 

    const posts = await Post.find({ author: userId }).populate('author', 'username');
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

  
