const express = require("express");

const router = express.Router();
router.post("/likePost", likePost);
router.get("/likePost", likePost);

module.exports = router;
