const mongoose = require('mongoose');

const duckSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  image: { type: String, required: true },
  owner: { type: mongoose.Mixed, firstName: String, lastName: String },
});

module.exports = mongoose.model('Duck', duckSchema);
