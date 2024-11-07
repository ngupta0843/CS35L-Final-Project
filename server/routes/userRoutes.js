const express = require("express");

const {signin, signup, test, testGet} = require("../controllers/users/users.controllers.js");


const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/test", test);
router.get("/test", testGet);

module.exports = router;