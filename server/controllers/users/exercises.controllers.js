const Exercises = require("../../models/exerciseLog.js");

//add a new exercise to the database

const addExercise = async (req, res) => {
  const { tag, exercise, weight, reps, sets, userId } = req.body;
  id = req.params.userId;
  try {
    const newExercise = new Exercises({
      tag,
      exercise,
      weight,
      reps,
      sets,
      color,
      userId,
    });
    await newExercise.save();
    res.status(201).json(newExercise);
    console.log("Exercise added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add exercise" });
  }
};

const updateExercise = async (req, res) => {
  const { tag, exercise, weight, reps, sets, userId } = req.body;
  const {id} = req.params;
  try {
    const updatedExercise = await Exercises.findByIdAndUpdate(
      id,
      {
        tag,
        exercise,
        weight,
        reps,
        sets,
        color,
        userId,
      },
      { new: true }
    );
    res.status(200).json(updatedExercise);
    } catch (error) {
        res.status(500).json({ message: "Failed to update exercise" });
    }
};

  const deleteExercise = async (req, res) => {
    const {id} = req.params;
    try {
        await Exercises.findByIdAndDelete(id);
        res.status(200).json({ message: "Exercise deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete exercise" });
    }
};

const getUserExercises = async (req, res) => {
    const {id} = req.body;
    try {
        const exercises = await Exercises.find({ userId: id });
        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({ message: "Failed to get exercises" });
    }
};

module.exports = {
  addExercise,
  updateExercise,
  deleteExercise,
  getUserExercises
};

