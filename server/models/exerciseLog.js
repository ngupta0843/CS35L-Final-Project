// Create a schema for workout logging
const mongoose = require("mongoose");

const exerciseLog = mongoose.Schema({
    date: {
      type: Date,
      default: Date.now,
    },
    tag: {
      type: String,
      required: true,
    },
    exercise: {
      type : String,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    reps: {
      type: Number,
      required: false
    },
    sets: {
      type: Number,
      required: false
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users', 
      required: true,
    }
  });

const Exercises = mongoose.model("Exercises", exerciseLog);
module.exports = Exercises;
