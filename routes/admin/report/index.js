const express = require('express');
const { authenticateUser } = require('../../../middleware/authenticate');
const { authenticateAdmin } = require('../../../middleware/admin');
const getReportedUser = require('./user');
const getReportedIssue = require('./issue');
const router = express.Router();

router.get("/issue", authenticateUser, authenticateAdmin, getReportedIssue);
router.get("/user", authenticateUser, authenticateAdmin, getReportedUser);

module.exports = router;