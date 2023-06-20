const express = require('express');
const login = require('./login');
const register = require('./signUp');
const refreshToken = require('./refreshToken');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
//router.get('/token',token);
router.get('/refreshToken',refreshToken);

module.exports = router;