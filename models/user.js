const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModel = new Schema({
  name: {
    type: String,
    require: [true, 'user must have a name'],
  },
  email: {
    type: String,
    require: [true, 'user must have an email'],
  },
  password: {
    type: String,
    require: [true, 'user must a password'],
  },
});
module.exports = mongoose.model('User', userModel);
