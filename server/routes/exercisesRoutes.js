const express = require("express");
const router = express.Router();
const exercisesController = require("../controllers/exercises/exercises.controllers.js");

router.post("/addExercise", exercisesController.createExerciseLog); 
router.get("/getExercise/:userId", exercisesController.getUserExercises);   
router.put("/editExercise/:id", exercisesController.updateExerciseLog); 
router.delete("/deleteExercise/:id", exercisesController.deleteExerciseLog); 

module.exports = router;