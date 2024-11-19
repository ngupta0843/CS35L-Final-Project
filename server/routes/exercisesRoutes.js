const express = require("express");

const {addExercise, updateExercise, deleteExercise, getUserExercises} = require("../controllers/users/exercises.controllers.js");

const router = express.Router();

router.post("/exercises/:userId", addExercise);
router.put("/exercises/:userId", updateExercise);
router.delete("/exercises/:userId", deleteExercise);
router.get("/exercises/:userId", getUserExercises);

module.exports = router;