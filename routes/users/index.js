const express = require('express');
const login = require('./login');
const register = require('./signUp');
const refreshToken = require('./refreshToken');
const logout = require('./logout');
const check = require('./idcheck');
const { authenticateUser } = require('../../middleware/authenticate');
const getUser = require('./getUser');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/check', check);
router.get('/refreshToken',refreshToken);
router.get('/', authenticateUser, getUser);

router.delete('/logout', authenticateUser,logout);

module.exports = router;