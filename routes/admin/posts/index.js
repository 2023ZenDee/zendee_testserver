const express = require('express');
const postsDetail = require('./postdetail');
const router = express.Router();

router.get('/:postIdx', postsDetail);

module.exports = router;