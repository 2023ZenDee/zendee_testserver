const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");
const util = require("../../module/authUtil");
const resMessage = require("../../module/responseMessage");
const statusCode = require("../../module/statusCode");
const { generateAccessToken, generateRefreshToken } = require("../../util/jwt");
const prisma = new PrismaClient();
const login = async (req, res) => {
  try {
    const { user_id, password } = req.body;

    const user = await prisma.user.findUnique({ where: { userId: user_id } });
    const hashedLoginPassword = crypto
      .createHash("sha512")
      .update(password)
      .digest("base64");
    if (!user || user.password !== hashedLoginPassword) {
      return res
        .status(200)
        .send(util.successTrue(statusCode.BAD_REQUEST, resMessage.LOGIN_FAIL));
    }

    const accessToken = generateAccessToken(user_id);
    const refreshToken = generateRefreshToken(user_id);

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
          resMessage.SIGNUP_SERVER_ERROR
        )
      );
  }
};

module.exports = login;
