const express = require('express');
const postByRegion = require("./regionToPost");
const postByTag = require('./tagToPost');
const router = express.Router();

router.get("/issues/region",postByRegion);
router.get('/issues/tag', postByTag);


module.exports = router;