const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const crypto = require("crypto");
const resMessage = require("../../module/responseMessage");
const util = require("../../module/authUtil");
const status = require("../../module/statusCode");

const register = async (req, res) => {
  const { user_id, nick, email, password } = req.body;
  const hashPwd = crypto.createHash("sha512").update(password).digest("base64");
  try {
    const ifUser = await prisma.user.findUnique({
      where: {
        userId: user_id,
      },
    });

    if (ifUser === null) {
      const user = {
        userId: user_id,
        nick: nick,
        email: email,
        password: hashPwd,
        role : 'ADMIN',
        updated_at: new Date(),
      };

      await prisma.user.create({
        data: user,
      });

      return res
        .status(200)
        .send(util.successTrue(status.CREATED, resMessage.SIGNUP_SUCCESS));
    } else {
      return res
        .status(200)
        .send(util.successTrue(status.BAD_REQUEST, resMessage.SIGNUP_FAIL));
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
