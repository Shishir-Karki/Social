// routes/postRoutes.js

const express = require('express');
const router = express.Router();
const { createPost, getPosts, getUserPosts, deletePost, updatePost, likes, comments } = require('../controller/post-controller');
const authMiddleware = require('../middlewares/auth-middeware');

router.post('/createPost', authMiddleware, createPost);
router.get('/getpost', getPosts);
router.get('/user-posts', authMiddleware, getUserPosts); 
router.delete('/delete-post/:postId', authMiddleware, deletePost);  
router.put('/update-post/:postId', authMiddleware, updatePost);
router.put('/like/:id', authMiddleware, likes)
router.post('/comment/:id', authMiddleware, comments)


module.exports = router;
