const express = require('express');
const postByRegion = require("./regionToPost");
const router = express.Router();

router.get("/issues/region", postByRegion);
router.get('/issues');


module.exports = router;