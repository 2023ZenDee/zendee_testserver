const express = require("express");
const issues = require("./issue");
const router = express.Router();
const { authenticateUser } = require("../../middleware/authenticate");
const getIssue = require("./getissue");
const getBoard = require("./getboard");
const deleteIssue = require("./delissue");
const fixedIssue = require("./fixissue");

router.post("/", authenticateUser, issues);
router.get("/mymap", authenticateUser, getIssue);
router.get("/board/:page", authenticateUser, getBoard);

router.patch("/fix/:issueIdx", authenticateUser, fixedIssue);
router.delete("/delete/:page", authenticateUser, deleteIssue);

module.exports = router;
