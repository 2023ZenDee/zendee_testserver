const express = require("express");
const reportRouter = require('./report');
const router = express.Router();

router.use('/reported', reportRouter);

module.exports = router;
