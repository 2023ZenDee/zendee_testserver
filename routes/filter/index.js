const express = require('express');
const likesFilter = require('./likesFilter');
const router = express.Router();

router.get('/posts', likesFilter)

module.exports = router;