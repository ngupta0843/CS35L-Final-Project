const express = require("express");
const { callgpt } = require("../controllers/ml/ml.controllers.js");

const router = express.Router();

router.post("/", callgpt);

module.exports = router;
