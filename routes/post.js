const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');
router
  .route('/api/posts/')
  .get(protect, postController.getPost)
  .post(protect, postController.createPost);
router
  .route('/api/post/:id')
  .delete(protect, postController.deletePost)
  .patch(protect, postController.updatePost)
  .get(protect, postController.getSinglePost);

module.exports = router;
