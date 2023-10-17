const express = require('express');
const postsDetail = require('./postdetail');
const { authenticateAdmin } = require('../../../middleware/admin');
const { authenticateUser } = require('../../../middleware/authenticate');
const router = express.Router();

router.get('/:postIdx', authenticateUser,authenticateAdmin,postsDetail);

module.exports = router;