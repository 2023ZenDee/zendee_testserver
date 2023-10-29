const express = require("express");
const axios = require("axios");
const { generateAccessToken, generateRefreshToken } = require("../../../util/token/jwt");
const authUtil = require("../../../module/authUtil");
const statusCode = require("../../../module/statusCode");
const responseMessage = require("../../../module/responseMessage");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

const googleLogin = async (req, res) => {
  const { email, nick } = req.body;

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email : email,
      },
    });
    if (!findUser) {
      const user = {
        userId: nick,
        email: email,
        nick: nick,
        provider: "GOOGLE",
      };

      await prisma.user.create({
        data: user
      });
      const accessToken = generateAccessToken(email);
      const refreshToken = generateRefreshToken(email);
      res
        .status(201)
        .send(
          authUtil.jwtSent(
            statusCode.CREATED,
            responseMessage.OAUTH_GOOGLE_SUCCESS,
            accessToken,
            refreshToken,
        
          )
        );
    }else{
      const accessToken = generateAccessToken(email);
      const refreshToken = generateRefreshToken(email);
      res
        .status(200)
        .send(
          authUtil.jwtSent(
            statusCode.OK,
            responseMessage.OAUTH_GOOGLE_LOGIN_SUCCESS,
            accessToken,
            refreshToken
          )
        );
    }
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .send(
        authUtil.successFalse(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.SERVER_ERROR
        )
      );
  }
};
module.exports = googleLogin;
