const express = require('express');
const postsDetail = require('./postdetail');
const { authenticateAdmin } = require('../../../middleware/admin');
const { authenticateUser } = require('../../../middleware/authenticate');
const userDetail = require('./userdetail');
const router = express.Router();

router.get('/post/:postIdx', authenticateUser,authenticateAdmin,postsDetail);
router.get('/user/:userIdx', authenticateUser, authenticateAdmin, userDetail);
module.exports = router;