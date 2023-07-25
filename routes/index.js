const express = require('express');
const userRouter = require('./users');
const postRouter = require('./issue');
const likeRouter = require('./like');
const commentRouter = require('./comment');
const reportRouter = require('./report');
const mailRouter = require('./mail');
const router = express.Router();


router.use('/auth',userRouter);
router.use('/issues', postRouter);
router.use('/like', likeRouter);
router.use('/comments', commentRouter);
router.use('/report', reportRouter);
router.use('/mail', mailRouter);

module.exports = router;
