const express = require('express');
const login = require('./login');
const signUp = require('./signUp');
const token = require('./token');


const router = express.Router();

router.post('/signUp', signUp);
router.post('/login', login);
router.get('/token',token);

module.exports = router;