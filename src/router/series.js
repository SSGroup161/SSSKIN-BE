let express = require("express");
let router = express.Router();
const { getData, getDataById } = require("../controller/seriesController");

router.get("/", getData);
router.get("/:id", getDataById);

module.exports = router;
