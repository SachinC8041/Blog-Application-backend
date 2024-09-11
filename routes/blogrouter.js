const express = require('express');
const router = express.Router();

const {likePost,dummy,unlikePost} = require('../controllers/likeController');
const {createComment,getComment} = require('../controllers/commentController');
const {postCreate, getPost } = require('../controllers/postController');

// Define routes
router.get('/dummyroute', dummy);
router.post('/comment/create', createComment);
router.post('/post/create', postCreate);
router.get('/post', getPost); // Added route for fetching posts
router.get('/comment',getComment);
router.post('/like/likes',likePost);
router.post('/like/unlike',unlikePost);
module.exports = router;
