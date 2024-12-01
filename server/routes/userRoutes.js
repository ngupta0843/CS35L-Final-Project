const express = require("express");

<<<<<<< HEAD
const {signin, signup, test, testGet} = require("../controllers/users/users.controllers.js");
const {addExercise, updateExercise, deleteExercise, getUserExercises} = require("../controllers/users/exercises.controllers.js");
=======
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
>>>>>>> test

const router = express.Router();

router.post("/signin", signin);
router.get("/getUserList", getUserList);
router.post("/signup", signup);
router.post("/test", test);
router.get("/test", testGet);
router.get("/currentUser", getCurrentUser);
router.post("/sendFriendRequest", sendFriendRequest);
router.post("/getUser/:id", getUser);

<<<<<<< HEAD
router.post("/exercises/:userId", addExercise);
router.put("/exercises/:userId", updateExercise);
router.delete("/exercises/:userId", deleteExercise);
router.get("/exercises/:userId", getUserExercises);

module.exports = router;
=======
module.exports = router;
>>>>>>> test
