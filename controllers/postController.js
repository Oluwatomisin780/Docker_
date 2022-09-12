const Post = require('../models/post');
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    throw err;
  }
};
exports.getSinglePost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (err) {
    throw err;
  }
};
exports.createPost = async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  try {
    const post = new Post({
      title: title,
      body: body,
    });
    const postCreated = await post.save();
    res.status(200).json(postCreated);
  } catch (err) {
    throw err;
  }
};

exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({
      status: false,
      message: err,
    });
  }
};
exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const deletePost = await Post.findByIdAndDelete(postId);
    res.status(200).json({
      message: 'deleted',
      status: true,
    });
  } catch (err) {
    res.status(404).json({
      message: err,
      status: fail,
    });
  }
};
