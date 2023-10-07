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


router.post("/", authenticateUser, upload.single('img') ,issues);
router.get("/mymap", authenticateUser, getIssue);
router.get("/:page", authenticateUser, getBoard);
router.get("/rank/issue", authenticateUser, issueRanked);


router.patch("/fix/:issueIdx", authenticateUser, fixedIssue);
router.delete("/fire/:page", authenticateUser, deleteIssue);

module.exports = router;
