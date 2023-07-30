const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authUtil = require("../../module/authUtil");
const responseMessage = require("../../module/responseMessage");
const statusCode = require("../../module/statusCode");

const mailCheck = async (req, res) => {
  const { check, userId } = req.body;
  if (check === "true") {
    const success = await prisma.user.update({
      where: {
        userId,
      },
      data: {
        email_check: true,
      },
    });
    return res
      .status(200)
      .send(
        authUtil.successTrue(
          statusCode.OK,
          responseMessage.SUCCESS_EMAIL_CHECK,
          success
        )
      );
  } else {
    return res
      .status(200)
      .send(
        authUtil.successTrue(
          statusCode.BAD_REQUEST,
          responseMessage.FALSE_EMAIL_CHECK
        )
      );
  }
};

module.exports = mailCheck;
