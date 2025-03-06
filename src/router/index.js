const express = require("express");
const router = express.Router();
const Series = require("./series");
const Product = require("./product");
const HTU = require("./htu");
const Article = require("./article");
const Auth = require("./auth");

router.use("/api/v1/series", Series);
router.use("/api/v1/product", Product);
router.use("/api/v1/htu", HTU);
router.use("/api/v1/article", Article);
router.use("/api/v1/auth", Auth);

module.exports = router;
