const express =require('express');
const issue = require('./issue');
const router = express.Router();


router.post("/",issue);


module.exports = router;