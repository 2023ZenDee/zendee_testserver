const express = require('express');
const userRouter = require('./users');
const postRouter = require('./issue');
const likeRouter = require('./like');
const commentRouter = require('./comment');
const reportRouter = require('./report');
const mailRouter = require('./mail');
const filterRouter = require('./filter');
const adminRouter = require('./admin');
const oauthRouter = require('./users/oauth')
const router = express.Router();


router.use('/auth',userRouter);
router.use('/issues', postRouter);
router.use('/like', likeRouter);
router.use('/comments', commentRouter);
router.use('/report', reportRouter);
router.use('/mail', mailRouter);
router.use('/filter', filterRouter);
router.use('/admin', adminRouter);
router.use('/oauth', oauthRouter);

module.exports = router;
