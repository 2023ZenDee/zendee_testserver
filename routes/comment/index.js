const express = require('express');
const comments = require('./comments');
const { authenticateUser } = require('../../middleware/authenticate');
const router = express.Router();


router.post("/:page", authenticateUser,comments);



module.exports = router;