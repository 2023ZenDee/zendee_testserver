const express =require('express');
const issues = require('./issue');
const router = express.Router();
const { authenticateUser}  = require('../../middleware/authenticate');


router.post('/', authenticateUser ,issues);

module.exports = router;