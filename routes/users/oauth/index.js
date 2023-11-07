const express = require('express');
const webGoogleLogin = require('./google');

const router = express.Router();

router.post("/google", webGoogleLogin);
module.exports = router;