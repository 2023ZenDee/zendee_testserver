const { PrismaClient } = require("@prisma/client");
const { generateAccessToken } = require("../../util/token/jwt");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const authUtil = require("../../module/authUtil");
const responseMessage = require("../../module/responseMessage");
const statusCode = require("../../module/statusCode");
require("dotenv").config();
const secret = process.env.SECRET_KEY;
const refreshToken = async (req, res) => {
  const refreshToken = req.headers.refreshtoken;
  if (!refreshToken) {
    return res
      .status(401)
      .json(
        authUtil.successTrue(
          statusCode.UNAUTHORIZED,
          responseMessage.NO_REFRESH_TOKEN
        )
      );
  }

  try {
    const decoded = jwt.verify(refreshToken, secret); // Refresh Token 검증

    // Refresh Token의 payload에서 사용자 정보를 가져옴
    const userId = decoded.id;
    const user = await prisma.user.findUnique({ where: { userId } });

    if (!user) {
      return res
        .status(401)
        .json(
          authUtil.successTrue(statusCode.UNAUTHORIZED, responseMessage.NO_USER)
        );
    }

    // 새로운 Access Token 생성
    const accessToken = generateAccessToken(userId);

    res
      .status(200)
      .send(
        authUtil.successTrue(
          statusCode.OK,
          responseMessage.ACCESS_TOKEN,
          accessToken
        )
      );
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json(
          authUtil.successTrue(
            statusCode.UNAUTHORIZED,
            responseMessage.REFRESH_TOKEN_EXPIRED
          )
        );
    } else if (err.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json(
          authUtil.successTrue(
            statusCode.UNAUTHORIZED,
            responseMessage.INVALID_REFRESH_TOKEN
          )
        );
    }else{
      return res.status(500).json(
        authUtil.successFalse(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.SERVER_ERROR
        )
      )
    }
  }
};

module.exports = refreshToken;
