const express =require('express');
const likePost = require('./like');
const { authenticateUser } = require('../../middleware/authenticate');
const router = express.Router();

router.post('/:post', authenticateUser,likePost);




module.exports = router;