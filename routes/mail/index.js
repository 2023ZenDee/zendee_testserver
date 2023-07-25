const express =require('express');
const sendMail = require('./auth');
const router = express.Router();

router.post('/', sendMail);

module.exports = router;