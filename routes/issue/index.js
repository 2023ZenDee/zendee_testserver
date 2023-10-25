const express = require("express");
const issues = require("./issue");
const router = express.Router();
const { authenticateUser } = require("../../middleware/authenticate");
const getIssue = require("./getissue");
const getBoard = require("./getboard");
const deleteIssue = require("./delissue");
const fixedIssue = require("./fixissue");
const { upload } = require("../../middleware/multer");
const issueRanked = require("./rank");
const imageUploader = require("../../middleware/imageUploader");


//router.post("/", authenticateUser, upload.single('img') ,issues);
router.post("/", authenticateUser, imageUploader.single("img"), issues);
router.get("/mymap", authenticateUser, getIssue);
router.get("/:page", authenticateUser, getBoard);
router.post("/rank/issue", authenticateUser, issueRanked);


router.patch("/fix/:issueIdx", authenticateUser, imageUploader.single("img"),fixedIssue);
router.delete("/fire/:page", authenticateUser, deleteIssue);

module.exports = router;
