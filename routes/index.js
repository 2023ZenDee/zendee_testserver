const express = require('express');
const userRouter = require('./users');
const postRouter = require('./board');
const likeRouter = require('./like');
const commentRouter = require('./comment');
const router = express.Router();

router.use('/auth',userRouter);
router.use('/issues', postRouter);
router.use('/like', likeRouter);
router.use('/comment', commentRouter);


module.exports = router;
