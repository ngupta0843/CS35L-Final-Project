const express = require("express");

const {
  signin,
  signup,
  test,
  testGet,
  getUserList,
  getCurrentUser,
  sendFriendRequest,
  getUser,
} = require("../controllers/users/users.controllers.js");
const {
  addExercise, 
  updateExercise, 
  deleteExercise, 
  getUserExercises
} = require("../controllers/users/exercises.controllers.js");

const router = express.Router();

router.post("/signin", signin);
router.get("/getUserList", getUserList);
router.post("/signup", signup);
router.post("/test", test);
router.get("/test", testGet);
router.get("/currentUser", getCurrentUser);
router.post("/sendFriendRequest", sendFriendRequest);
router.post("/getUser/:id", getUser);

router.post("/exercises/:userId", addExercise);
router.put("/exercises/:userId", updateExercise);
router.delete("/exercises/:userId", deleteExercise);
router.get("/exercises/:userId", getUserExercises);

module.exports = router;