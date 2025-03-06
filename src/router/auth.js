const express = require("express");
const router = express.Router();
const { login, postData } = require("../controller/authController");

router.post("/login", login);
router.post("/add", postData);

module.exports = router;
