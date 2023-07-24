const express = require('express');
const issueReport = require('./issuereport');
const commentReport = require('./cmtreport'); 
const { authenticateUser } = require('../../middleware/authenticate');
const router = express.Router();

router.post('/issue/:idx', authenticateUser,issueReport);
router.post('/comment/:idx', authenticateUser,commentReport);


module.exports = router;