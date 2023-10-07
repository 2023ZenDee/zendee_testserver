const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");
const util = require("../../module/authUtil");
const resMessage = require("../../module/responseMessage");
const statusCode = require("../../module/statusCode");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../util/token/jwt");
const prisma = new PrismaClient();
const login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const user = await prisma.user.findUnique({ where: { userId } });
    const hashedLoginPassword = crypto
      .createHash("sha512")
      .update(password)
      .digest("base64");
    if (!user || user.password !== hashedLoginPassword) {
      return res
        .status(200)
        .send(util.successTrue(statusCode.BAD_REQUEST, resMessage.LOGIN_FAIL));
    }
    // if (user.email_check == 0) {
    //   return res
    //     .status(401)
    //     .send(
    //       util.successTrue(statusCode.UNAUTHORIZED, resMessage.NO_ACCESS_RIGHT)
    //     );
    // }

    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    return res
      .status(200)
      .send(
        util.jwtSent(
          statusCode.OK,
          resMessage.LOGIN_SUCCESS,
          accessToken,
          refreshToken
        )
      );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        util.successFalse(
          statusCode.INTERNAL_SERVER_ERROR,
          resMessage.SERVER_ERROR
        )
      );
  }
};

module.exports = login;
