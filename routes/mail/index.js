const express =require('express');
const sendMail = require('./auth');
const checkMail = require('./mailCheck');
const router = express.Router();

router.post('/', sendMail);
router.post('/check', checkMail);

module.exports = router;