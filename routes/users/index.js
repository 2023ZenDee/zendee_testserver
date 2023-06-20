const express = require('express');
const login = require('./login');
const register = require('./signUp');
const refreshToken = require('./refreshToken');
const logout = require('./logout');
const check = require('./idcheck');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/check', check);
//router.get('/token',token);
router.get('/refreshToken',refreshToken);
router.delete('/logout', logout);
module.exports = router;