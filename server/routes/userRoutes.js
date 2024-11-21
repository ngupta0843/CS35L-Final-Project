const express = require("express");

const {signin, signup, test, testGet, getUserList} = require("../controllers/users/users.controllers.js");


const router = express.Router();

router.post("/signin", signin);
router.get("/getUserList", getUserList);
router.post("/signup", signup);
router.post("/test", test);
router.get("/test", testGet);

module.exports = router;