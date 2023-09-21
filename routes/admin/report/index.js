const express = require('express');
const { authenticateUser } = require('../../../middleware/authenticate');
const { authenticateAdmin } = require('../../../middleware/admin');
const getReportedUser = require('./user');
const getReportedIssue = require('./issue');
const getReportedComment = require('./comment');
const router = express.Router();

// router.get("/issue", authenticateUser, authenticateAdmin, getReportedIssue);
// router.get("/user", authenticateUser, authenticateAdmin, getReportedUser);
// router.get("/comment", authenticateUser, authenticateAdmin, getReportedComment);

router.get("/issue", getReportedIssue);
router.get("/user", getReportedUser);
router.get("/comment", getReportedComment);

module.exports = router;