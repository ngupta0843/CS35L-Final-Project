const mongoose = require("mongoose");

const exerciseLogSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  exercise: { type: String, required: true },
  weight: { type: Number, required: true },
  reps: { type: Number, required: true },
  sets: { type: Number, required: true },
  color: { type: String, required: true },
  userId: { type: String, required: true }, 
  date: { type: Date, required: true }, 
});


const ExerciseLog = mongoose.model("exercises", exerciseLogSchema);
module.exports = ExerciseLog;
