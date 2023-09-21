const express = require("express");
const axios = require("axios");
const { generateAccessToken } = require("../../../util/token/jwt");
const authUtil = require("../../../module/authUtil");
const statusCode = require("../../../module/statusCode");
const responseMessage = require("../../../module/responseMessage");
const router = express.Router();
require("dotenv").config();

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleRedirectURI = process.env.GOOGLE_REDIRECT_URL;

const googleLogin = async (req, res) => {
  const { code } = req.query;
  console.log(`code : ${code}`);
  const resp = await axios.post(GOOGLE_TOKEN_URL, {
    code,
    client_id: googleClientId,
    client_secret: googleClientSecret,
    redirect_uri: googleRedirectURI,
    grant_type: "authorization_code",
  });
  const resp2 = await axios.get(GOOGLE_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${resp.data.access_token}`,
    },
  });
  res.json(resp2.data);
};
module.exports = googleLogin;
