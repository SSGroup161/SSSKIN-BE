let express = require("express");
let router = express.Router();
const {
    getData,
    getDataById,
    getDataBySeries,
} = require("../controller/productController");

router.get("/", getData);
router.get("/:id", getDataById);
router.get("/series/:series", getDataBySeries);

module.exports = router;
