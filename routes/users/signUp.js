const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const {generateAccessToken , generateRefreshToken} = require('../../util/jwt')
const crypto = require("crypto");
const resMessage = require("../../module/responseMessage");
const util = require("../../module/authUtil");
const status = require("../../module/statusCode");
const statusCode = require("../../module/statusCode");
const responseMessage = require("../../module/responseMessage");

const register = async (req, res) => {
  const { userId, nick, email, password } = req.body;
  const hashPwd = crypto.createHash("sha512").update(password).digest("base64");
  try {
    const ifUser = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    const cloneEmail = await prisma.user.findUnique({
      where : {
        email
      }
    })
    
    if (ifUser === null && cloneEmail === null) {
      const user = {
        userId: userId,
        nick: nick,
        email: email,
        password: hashPwd,
        // role : 'ADMIN',
        updated_at: new Date(),
      };

      await prisma.user.create({
        data: user,
      });
      const accessToken = generateAccessToken(userId);
      const refreshToken = generateRefreshToken(userId);

      return res
        .status(200)
        .send(util.jwtSent(status.CREATED, resMessage.SIGNUP_SUCCESS,accessToken, refreshToken));
    } else if(ifUser !== null && cloneEmail === null){
      return res
        .status(200)
        .send(util.successTrue(status.BAD_REQUEST, resMessage.DUPLICATION_USERID));
    } else if(ifUser === null && cloneEmail !== null){
      return res
        .status(200)
        .send(util.successTrue(status.BAD_REQUEST, resMessage.DUPLICATION_EMAIL));
    }else{
      return res.status(200).send(util.successTrue(statusCode.BAD_REQUEST, responseMessage.EMAIL_USERID_DUPLICATION));
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        util.successFalse(
          status.INTERNAL_SERVER_ERROR,
          resMessage.SIGNUP_SERVER_ERROR
        )
      );
  }
};

module.exports = register;
