const express = require('express');
const { authenticateUser } = require('../../middleware/authenticate');
const { authenticateAdmin } = require('../../middleware/admin');
const admin = require('./admin')
const router = express.Router();

router.get('/', authenticateUser, authenticateAdmin ,admin);

module.exports = router;