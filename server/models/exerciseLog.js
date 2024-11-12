// Create a schema for workout logging
const mongoose = require("mongoose");

const exerciseLog = mongoose.Schema({
    date: {
      type: Date,
      default: Date.now,
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
    }
  });

const Exercises = mongoose.model("Exercises", exerciseLog);
module.exports = Exercises;
