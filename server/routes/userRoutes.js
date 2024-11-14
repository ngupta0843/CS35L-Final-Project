const express = require("express");

const {signin, signup, test, testGet} = require("../controllers/users/users.controllers.js");
const {addExercise, updateExercise, deleteExercise} = require("../controllers/users/exercises.controllers.js");

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/test", test);
router.get("/test", testGet);

router.post("/exercises/:userId", addExercise);
router.put("/exercises/:id", updateExercise);
router.delete("/exercises/:id", deleteExercise);
router.get("/exercises/:id", getUserExercises);

module.exports = router;