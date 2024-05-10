const express = require('express');
const { createComment, createCommentToPost, deleteComment } = require('../controllers/comment.controller.js')
const router = express.Router();

router.post('/create', createComment)
router.post('/create' + '/:id', createCommentToPost)
router.delete('/delete' + '/:id', deleteComment)

module.exports = router;