const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../module/authUtil");
const statusCode = require("../../module/statusCode");
const responseMessage = require("../../module/responseMessage");
const { postData } = require("../../util/response/data");
const prisma = new PrismaClient();

const myCmts = async (req, res) => {
  try {
    const myPostByComment = await prisma.post.findMany({
      where : {
        comment : {
          some : {
            authorIdx : req.user.userIdx
          }
        }
      }
    });
    if (myPostByComment.length === 0) {
      return res
        .status(200)
        .send(
          authUtil.successTrue(
            statusCode.NO_CONTENT,
            responseMessage.EMPRY_MY_COMMENT
          )
        );
    }
    const processData = await postData(myPostByComment);

    return res
      .status(200)
      .send(
        authUtil.successTrue(
          statusCode.OK,
          responseMessage.MY_COMMENTS_GET_SUCCESS,
          processData
        )
      );
  } catch (err) {
    console.log(err);
    authUtil.successFalse(
      statusCode.INTERNAL_SERVER_ERROR,
      responseMessage.MY_COMMENTS_GET_FALSE
    );
  }
};

module.exports = myCmts;
