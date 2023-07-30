const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../module/authUtil");
const statusCode = require("../../module/statusCode");
const responseMessage = require("../../module/responseMessage");
const prisma = new PrismaClient();

const userFix = async (req, res) => {
  try {
    const { nick, image } = req.body;
    const userId = req.user.userIdx;

    const updateUser = await prisma.user.update({
      where: {
        userIdx: userId,
      },
      data: {
        nick,
        image,
      },
    });
    return res
      .status(200)
      .send(
        authUtil.successTrue(
          statusCode.OK,
          responseMessage.SUCCESS_USER_FIX,
          updateUser
        )
      );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(
        authUtil.successFalse(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.FALSE_USER_FIX
        )
      );
  }
};

module.exports = userFix;
