const express = require("express");
const router = express.Router();
const {addGoal, editGoal, getGoals, deleteGoal,} = require('../controllers/users/goal.controllers.js');

router.post("/addGoal", addGoal);
router.get("/getGoal/:userId", getGoals);
router.put("/editGoal/:id", editGoal);
router.delete("/deleteGoal/:id", deleteGoal);

module.exports = router;