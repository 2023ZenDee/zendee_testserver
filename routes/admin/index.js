const express = require("express");
const reportRouter = require('./report');
const filterRouter = require('./filter');
const postDetailRouter = require('./postdetail');
const statisticsRouter = require('./statistics');
const router = express.Router();

router.use('/reported', reportRouter);
router.use('/filter', filterRouter);
router.use('/post', postDetailRouter);
router.use("/statistics", statisticsRouter);
module.exports = router;
