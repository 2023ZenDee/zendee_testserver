const express = require("express");
const likesFilter = require("./postFilter");
const { authenticateUser } = require("../../../middleware/authenticate");
const postFilter = require("./postFilter");
const router = express.Router();

// router.get("/posts", authenticateUser, likesFilter);
router.get("/post", postFilter);

module.exports = router;
