const express = require('express');
const { authenticateUser } = require('../../../middleware/authenticate');
const { authenticateAdmin } = require('../../../middleware/admin');
const admin = require('./issue');
const router = express.Router();

router.get("/issue", authenticateUser, authenticateAdmin, admin);


module.exports = router;