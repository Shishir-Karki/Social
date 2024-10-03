// routes/postRoutes.js

const express = require('express');
const router = express.Router();
const { createPost, getPosts } = require('../controller/post-controller');
const authMiddleware = require('../middlewares/auth-middeware');

router.post('/createPost', authMiddleware, createPost);
router.get('/getpost', getPosts);


module.exports = router;
