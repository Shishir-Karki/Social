


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


exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.userID;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Ensure that the user is the author of the post
    if (post.author.toString() !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this post' });
    }

    await post.remove();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error in deletePost:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.userID;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content cannot be empty' });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Ensure the user is the author
    if (post.author.toString() !== userId) {
      return res.status(403).json({ error: 'You are not authorized to update this post' });
    }

    post.content = content;
    await post.save();

    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    console.error('Error in updatePost:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.likes =  async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    const post = await Post.findById(postId);

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'You have already liked this post' });
    }

    post.likes.push(userId);
    await post.save();

    res.json({ post });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

exports.comments = async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;

  if (!content) return res.status(400).json({ message: 'Comment content is required' });

  try {
    const post = await Post.findById(postId);

    post.comments.push({
      author: req.user.id,
      content: content
    });

    await post.save();

    res.json({ post });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
  
