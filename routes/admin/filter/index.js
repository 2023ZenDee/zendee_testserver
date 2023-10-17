const express = require("express");
const likesFilter = require("./postFilter");
const { authenticateUser } = require("../../../middleware/authenticate");
const postFilter = require("./postFilter");
const { authenticateAdmin } = require("../../../middleware/admin");
const router = express.Router();

// router.get("/posts", authenticateUser, likesFilter);
router.get("/post", authenticateUser , authenticateAdmin,postFilter);

module.exports = router;
