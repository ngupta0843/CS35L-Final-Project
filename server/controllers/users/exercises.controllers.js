const ExerciseLog = require("../../models/exerciseLog.js");

exports.createExerciseLog = async (req, res) => {
  try {
    console.log(req.body.data)
    const { tag, exercise, weight, reps, sets, color, userId, date } = req.body.data;
    console.log(tag, exercise, weight, reps, sets, color, userId, date);
    const newExercise = new ExerciseLog({
      tag: tag,
      exercise: exercise,
      weight: weight,
      reps: reps,
      sets: sets,
      color: color,
      userId: userId,
      date: date,
    });
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(500).json({ message: 'Error creating exercise log', error });
  }
};

exports.updateExerciseLog = async (req, res) => {
  const { tag, exercise, weight, reps, sets, color, userId, date } = req.body.data; 
  const { id } = req.params;
  try {
    const updatedExercise = await ExerciseLog.findByIdAndUpdate(
      id,
      { tag, exercise, weight, reps, sets, color, userId, date },
      { new: true }
    );
    if (!updatedExercise) {
      return res.status(404).json({ message: 'Exercise log not found' });
    }
    res.json(updatedExercise);
  } catch (error) {
    res.status(500).json({ message: 'Error updating exercise log', error });
  }
};

exports.deleteExerciseLog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLog = await ExerciseLog.findByIdAndDelete(id);

    if (!deletedLog) {
      return res.status(404).json({ message: 'Exercise log not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting exercise log', error });
  }
};

exports.getUserExercises = async (req, res) => {
  try {
    const { userId } = req.params;
    const logs = await ExerciseLog.find({ userId });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exercise logs', error });
  }
};



