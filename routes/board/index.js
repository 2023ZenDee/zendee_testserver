const express =require('express');
const issues = require('./issue');
const router = express.Router();
const { authenticateUser}  = require('../../middleware/authenticate');
const getIssue = require('./getissue');
const getBoard = require('./getboard');


router.post('/', authenticateUser ,issues);
router.get('/mymap',authenticateUser, getIssue);
router.get('/board/:page',authenticateUser, getBoard);

module.exports = router;