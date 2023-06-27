const express =require('express');
const issues = require('./issue');
const router = express.Router();
const { authenticateUser}  = require('../../middleware/authenticate');
const getIssue = require('./getissue');


router.post('/', authenticateUser ,issues);
router.get('/mymap',authenticateUser, getIssue);

module.exports = router;