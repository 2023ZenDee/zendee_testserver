const express = require("express");
const comments = require("./comments");
const { authenticateUser } = require("../../middleware/authenticate");
const router = express.Router();

router.post("/:issue", authenticateUser, comments.create);
router.get("/:issue", authenticateUser, comments.read);
router.patch("/:cmtIdx", authenticateUser, comments.update);
router.delete("/:cmtIdx", authenticateUser, comments.delete);

module.exports = router;
