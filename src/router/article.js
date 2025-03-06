const express = require("express");
const router = express.Router();
const {
    getData,
    getDataById,
    postData,
    deleteDataById,
    deleteSoftDataById,
    putData,
    getDataByStatus,
    postingArticleById,
} = require("../controller/articleController");
const upload = require("../helper/uploadCloudinary");
const { Protect } = require("../middleware/Protect");

router.get("/:id", getDataById);
router.get("/", getData);
router.get("/status/:id", getDataByStatus);
router.post("/", Protect, upload.single("link_img"), postData);
router.delete("/:id", Protect, deleteDataById);
router.put("/:id", Protect, upload.single("link_img"), putData);
router.put("/delete/:id", Protect, deleteSoftDataById);
router.put("/posting/:id", Protect, postingArticleById);

module.exports = router;
