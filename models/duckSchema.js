const { Schema, model } = require('mongoose');

const duckSchema = new Schema({
  name: { type: String, unique: true, required: true },
  image: { type: String, required: true },
});

module.exports = model('Duck', duckSchema);
