const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../module/authUtil");
const statusCode = require("../../module/statusCode");
const responseMessage = require("../../module/responseMessage");
const prisma = new PrismaClient();

const userFix = async (req, res) => {
  try {
    const { nick } = req.body;
    const userId = req.user.userIdx;
    //const img = `img/${req.file.filename}`;
    const filePath = !req.file ? null : req.file.location;
    if(nick.length === 0) {
      return res
        .status(400)
        .send(
          authUtil.successTrue(
            statusCode.BAD_REQUEST,
            responseMessage.REQUIRE_ID
          )
        );
    }
    const updateUser = await prisma.user.update({
      where: {
        userIdx: userId,
      },
      data: {
        nick,
        image: filePath,
      },
    });
    const data = {
      nick: updateUser.nick,
      image: filePath,
    };
    return res
      .status(200)
      .send(
        authUtil.successTrue(
          statusCode.OK,
          responseMessage.SUCCESS_USER_FIX,
          data
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
