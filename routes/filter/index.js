const express = require('express');
const likesFilter = require('./likesFilter');
const { authenticateUser } = require('../../middleware/authenticate');
const router = express.Router();

router.get('/posts',authenticateUser, likesFilter)

module.exports = router;