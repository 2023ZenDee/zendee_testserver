const express = require("express");
const sendMail = require("./auth");
const checkMail = require("./mailCheck");
const { mailAuthenticateUser } = require("../../middleware/authenticate");
const router = express.Router();

router.post("/", sendMail);
router.post("/check", mailAuthenticateUser,checkMail);

module.exports = router;
