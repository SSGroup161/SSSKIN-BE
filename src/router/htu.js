let express = require("express");
let router = express.Router();
const { getData, getDataSpecify } = require("../controller/htuController");

router.get("/", getData);
router.get("/:series", getDataSpecify);

module.exports = router;
