const express = require("express");
const reportRouter = require('./report');
const filterRouter = require('./filter');
const detailRouter = require('./detail');
const statisticsRouter = require('./statistics');
const router = express.Router();

router.use('/reported', reportRouter);
router.use('/filter', filterRouter);
router.use("/detail", detailRouter);
router.use("/statistics", statisticsRouter);
module.exports = router;
