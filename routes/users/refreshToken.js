const { PrismaClient} = require('@prisma/client');
const { generateAccessToken} = require('../../util/jwt');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const authUtil = require('../../module/authUtil');
const responseMessage = require('../../module/responseMessage');
const statusCode = require('../../module/statusCode');
require('dotenv').config();
const secret = process.env.SECRET_KEY;
const refreshToken = async (req, res) => {
    const refreshToken = req.headers.refresh; // 쿠키에서 Refresh Token을 가져옴
    if (!refreshToken) {
      return res.status(401).json(
        authUtil.successTrue(statusCode.UNAUTHORIZED,responseMessage.NO_REFRESH_TOKEN)
      );
    }
  
    try {
    const decoded = jwt.verify(refreshToken, secret); // Refresh Token 검증
  
      // Refresh Token의 payload에서 사용자 정보를 가져옴
      const userId = decoded.id;
      const user = await prisma.user.findUnique({ where: { userId } });
  
      if (!user) {
        return res.status(401).json(
          authUtil.successTrue(statusCode.UNAUTHORIZED, responseMessage.NO_USER)
        );
      }
  
      // 새로운 Access Token 생성
      const accessToken = generateAccessToken(user);
  
      res.status(200).json({ accessToken });
    } catch (err) {
        if(err.name=== 'TokenExpiredError'){
            return res.status(401).json(
              authUtil.successTrue(statusCode.UNAUTHORIZED, responseMessage.REFRESH_TOKEN_EXPIRED)
            );
        }
        console.log(err);
      return res.status(401).json(
        authUtil.successTrue(statusCode.UNAUTHORIZED, responseMessage.INVALID_REFRESH_TOKEN)
      );
    }
  };

  module.exports = refreshToken;