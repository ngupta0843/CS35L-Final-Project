const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  goal: { type: String, required: true },
});

const Goal = mongoose.model('goals', goalSchema);
module.exports = Goal;