const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authUtil = require("../../module/authUtil");
const responseMessage = require("../../module/responseMessage");
const statusCode = require("../../module/statusCode");

const mailCheck = async (req, res) => {
  const { code } = req.body;
  if (code === req.authNum) {
    try{
      await prisma.user.update({
        where: {
          email : req.email,
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
            
          )
        );
    }catch(err){
      console.log(err)
      return res.status(500).send(
        authUtil.successFalse(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.EMAIL_AUTH_FALSE
        )
      )
    }
    
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
module.exports = mailCheck
