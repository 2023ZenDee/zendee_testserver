const express = require('express');
const userRouter = require('./users');
const postRouter = require('./board');
const likeRouter = require('./like');

const router = express.Router();

router.use('/auth',userRouter);
router.use('/issues', postRouter);
router.use('/like', likeRouter);


module.exports = router;
