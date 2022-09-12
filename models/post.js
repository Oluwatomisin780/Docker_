const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postModel = new Schema({
  title: {
    type: String,
    reuqire: [true, 'post must have a title'],
  },
  body: {
    type: String,
    require: [true, 'post must have a body'],
  },
});
module.exports = mongoose.model('Post', postModel);
