const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../module/authUtil");
const statusCode = require("../../module/statusCode");
const responseMessage = require("../../module/responseMessage");
const { resPost } = require("../../util/response/post");
const { createDiffieHellmanGroup } = require("crypto");
const prisma = new PrismaClient();

const getBoard = async (req, res) => {
  const page = parseInt(req.params.page);
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + 9); 
  try {
    const board = await prisma.post.findUnique({
      where: {
        postIdx: page,
      },
    });
    if (!board) {
      return res
        .status(200)
        .send(
          authUtil.successTrue(
            statusCode.NOT_FOUND,
            responseMessage.NOT_FOUND_ISSUE
          )
        );
    }
    if (board.deleted_at < currentTime) {
      return res
        .status(200)
        .send(
          authUtil.successTrue(
            statusCode.UNAUTHORIZED,
            responseMessage.EXPIRED_POST
          )
        );
    }

    await prisma.post.update({
      where : {
        postIdx : board.postIdx
      },
      data: {
        views: board.views + 1,
      },
    });
    const post = await resPost(board);
    
    return res
      .status(200)
      .json(
        authUtil.successTrue(
          statusCode.OK,
          responseMessage.SUCCESS_FOUND_ISSUE,
          post
        )
      );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(
        authUtil.successFalse(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.FALSE_FOUND_ISSUE
        )
      );
  }
};
module.exports = getBoard;
