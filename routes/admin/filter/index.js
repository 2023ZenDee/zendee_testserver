const express = require("express");
const { authenticateUser } = require("../../../middleware/authenticate");
const postFilter = require("./postFilter");
const { authenticateAdmin } = require("../../../middleware/admin");
const router = express.Router();

router.get("/post", authenticateUser , authenticateAdmin,postFilter);

module.exports = router;
