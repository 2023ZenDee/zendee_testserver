const express = require("express");
const reportRouter = require('./report');
const filterRouter = require('./filter');
const postDetailRouter = require('./posts');
const router = express.Router();

router.use('/reported', reportRouter);
router.use('/filter', filterRouter);
router.use('/posts', postDetailRouter);
module.exports = router;
