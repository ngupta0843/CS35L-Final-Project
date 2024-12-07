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
  updateProfile,
  postTest,
} = require("../controllers/users/users.controllers.js");

const router = express.Router();

router.post("/signin", signin);
router.get("/getUserList", getUserList);
router.post("/signup", signup);
router.post("/test", postTest);
router.get("/test", testGet);
router.get("/currentUser", getCurrentUser);
router.post("/sendFriendRequest", sendFriendRequest);
router.post("/getUser", getUser);
router.put("/updateProfile", updateProfile);

module.exports = router;
