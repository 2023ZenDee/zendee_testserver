const express = require('express');
const userRouter = require('./users');
const postRouter = require('./board');


const router = express.Router();

router.use('/auth',userRouter);
router.use('/issues', postRouter);


module.exports = router;
