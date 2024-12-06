const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true,
    },
    date: {
        type: String, // Store dates in "YYYY-MM-DD" format
        required: true,
    },
    workouts: [
        {
            category: {
                type: String,
                required: true,
                enum: ["Biceps", "Triceps", "Shoulders", "Legs", "Chest", "Back", "Abs", "Cardio"],
            },
            name: { type: String, required: true },
            sets: { type: Number },
            reps: { type: Number },
            weight: { type: Number },
            duration: { type: Number }, // For cardio
        },
    ],
});

module.exports = mongoose.model("Workout", workoutSchema);

