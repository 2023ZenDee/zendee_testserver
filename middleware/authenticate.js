const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { successTrue } = require("../module/authUtil");
const prisma = new PrismaClient();

const util = require("../module/authUtil");
const resMessage = require("../module/responseMessage");
const statusCode = require("../module/statusCode");

require("dotenv").config();
const secret = process.env.SECRET_KEY;
exports.authenticateUser = async (req, res, next) => {
  const accessToken = req.headers.accesstoken; // 쿠키에서 Access Token을 가져옴

  if (!accessToken) {
    return res
      .status(200)
      .send(
        util.successTrue(statusCode.UNAUTHORIZED, resMessage.NO_ACCESS_TOKEN)
      );
  }

  try {
    const decoded = jwt.verify(accessToken, secret); // Access Token 검증

    // Access Token의 payload에서 사용자 정보를 가져옴
    const userId = decoded.id;
    const user = await prisma.user.findUnique({ where: { userId } });

    if (!user) {
      return res
        .status(401)
        .send(util.successTrue(statusCode.UNAUTHORIZED, resMessage.NO_USER));
    }

    // 요청 객체에 사용자 정보를 첨부하여 다음 미들웨어 또는 라우트 핸들러로 이동
    req.user = user;
    //console.log(req.user);
    next();
  } catch (err) {
    if ((err.name = "TokenExpiredError")) {
      return res
        .status(401)
        .json(
          util.successTrue(statusCode.UNAUTHORIZED, resMessage.TOKEN_EXPRIED)
        );
    }
    return res
      .status(401)
      .json(
        util.successTrue(
          statusCode.UNAUTHORIZED,
          resMessage.INVALID_ACCESS_TOKEN
        )
      );
  }
};
