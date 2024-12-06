const Workout = require("../../models/workoutModel.js");

// Add a workout
const addWorkout = async (req, res) => {
    const { userId, date, workout } = req.body;

    if (!userId || !date || !workout) {
        return res.status(400).json({ message: "User email, date, and workout are required." });
    }

    try {
        let workoutLog = await Workout.findOne({ userId, date });

        if (!workoutLog) {
            workoutLog = new Workout({ userId, date, workouts: [workout] });
        } else {
            workoutLog.workouts.push(workout);
        }

        await workoutLog.save();
        res.status(201).json({ message: "Workout added successfully", workoutLog });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get workouts for a specific date
const getWorkoutsByDate = async (req, res) => {
    const { userId, date } = req.params;

    try {
        const workoutLog = await Workout.findOne({ userId, date });

        if (!workoutLog) {
            return res.status(404).json({ message: "No workouts found for this date." });
        }

        res.status(200).json(workoutLog);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete a specific workout
const deleteWorkout = async (req, res) => {
    const { workoutId } = req.params;

    try {
        const workoutLog = await Workout.findOneAndUpdate(
            { "workouts._id": workoutId },
            { $pull: { workouts: { _id: workoutId } } },
            { new: true }
        );

        if (!workoutLog) {
            return res.status(404).json({ message: "Workout not found." });
        }

        res.status(200).json({ message: "Workout deleted successfully", workoutLog });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { addWorkout, getWorkoutsByDate, deleteWorkout };
