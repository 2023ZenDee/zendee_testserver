const express = require('express');
const googleLogin = require('./google');

const router = express.Router();

router.get('/redirect', googleLogin);

module.exports = router;