const express = require("express");
const reportRouter = require('./report');
const filterRouter = require('./filter');
const router = express.Router();

router.use('/reported', reportRouter);
router.use('/filter', filterRouter);

module.exports = router;
