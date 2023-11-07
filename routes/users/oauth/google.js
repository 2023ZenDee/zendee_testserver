const { OAuth2Client} = require('google-auth-library')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
const client = new OAuth2Client();
require('dotenv').config();

const webGoogleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const findUser = await prisma.user.findUnique({
      where: {
        email : payload.email,
      },
    });
    const user = {
      userId: payload.nick,
      email: payload.email,
      nick: payload.nick,
      provider: "GOOGLE",
    };
    if (!findUser) {

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
      await prisma.user.update({
        where : {
          userId : findUser.userId
        },
        data : {
          user
        }
      })
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
module.exports = webGoogleLogin;
