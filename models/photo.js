const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 280 },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

// describe the schema
const photoSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2},
  image: { type: String, required: true, pattern: /^https?:\/\/.+/ },
  method: String,
  about: String,
  comments: [ commentSchema ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User'}]
});

// create the model
module.exports = mongoose.model('Photo', photoSchema);
