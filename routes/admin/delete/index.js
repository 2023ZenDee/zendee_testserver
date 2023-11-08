const express = require('express');
const issueDelete = require('./issuedelete');
const userDelete = require('./userdelete');
const cmtDelete = require('./commentdelete');
const router = express.Router();

router.delete('/user/:idx', userDelete);
router.delete('/issue/:idx', issueDelete);
router.delete('/comment/:idx', cmtDelete);

module.exports = router