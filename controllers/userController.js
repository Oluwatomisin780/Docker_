const User = require('../models/user');
const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken')
exports.createUserAcct = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const encryptPassword = await bcrypt.hash(password, 12);
  try {
    const user = new User({
      name: name,
      email: email,
      password: encryptPassword,
    });
    req.session.user = user;
    const createdUser = await user.save();
    res.status(200).json(createdUser);
  } catch (err) {
    res.status(401).json({
      message: 'user creation failed',
      staus: false,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.json({
      message: 'email does not exist',
    });
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res.status(401).json({
      message: 'password non correct ',
      status: false,
    });
  }
  req.session.user = user;
  res.status(200).json({
    email: user.email,
    userId: user._id,
  });
};
