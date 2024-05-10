const express = require('express');
const { createPost, allPosts } = require('../controllers/post.controller.js');

const router = express.Router();

router.get('/', allPosts)
router.post('/create', createPost);
//TODO skapa delete route.

module.exports = router;