const express = require('express');
const googleLogin = require('./google');

const router = express.Router();

router.post('/google', googleLogin);
router.get('/login', (req,res)=>{
    res.send(`
        <h1>Log in</h1>
        <a href="/oauth/signup">Log in</a>
    `)
})
module.exports = router;