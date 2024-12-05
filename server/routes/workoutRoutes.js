const express = require("express");
const { addWorkout, getWorkoutsByDate, deleteWorkout } = require("../controllers/users/workout.controllers.js");
const router = express.Router();

router.post("/add", addWorkout);
router.get("/:userId/:date", getWorkoutsByDate);
router.delete("/:workoutId", deleteWorkout);

module.exports = router;
