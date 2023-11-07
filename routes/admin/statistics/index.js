const express = require('express');
const postByRegion = require("./regionToPost");
const postByTag = require('./tagToPost');
const postByTime = require('./timeToPost');
const { authenticateUser } = require('../../../middleware/authenticate');
const { authenticateAdmin } = require('../../../middleware/admin');
const router = express.Router();

router.get("/issues/region",authenticateUser,authenticateAdmin,postByRegion);
router.get("/issues/tag", authenticateUser, authenticateAdmin, postByTag);
router.get("/issues/time", authenticateUser, authenticateAdmin, postByTime);

module.exports = router;