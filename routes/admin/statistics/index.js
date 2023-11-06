const express = require('express');
const postByRegion = require("./regionToPost");
const postByTag = require('./tagToPost');
const postByTime = require('./timeToPost');
const router = express.Router();

router.get("/issues/region",postByRegion);
router.get('/issues/tag', postByTag);
router.get('/issues/time', postByTime);

module.exports = router;