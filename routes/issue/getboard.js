const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../module/authUtil");
const statusCode = require("../../module/statusCode");
const responseMessage = require("../../module/responseMessage");
const prisma = new PrismaClient();

const getBoard = async (req, res) => {
  const page = parseInt(req.params.page);
  let nowDate = new Date();
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
    if (board.deleted_at > nowDate) {
      return res
        .status(200)
        .send(
          authUtil.successTrue(
            statusCode.UNAUTHORIZED,
            responseMessage.EXPIRED_POST
          )
        );
    }
    const views = await prisma.post.update({
      where: {
        postIdx: page,
      },
      data: {
        views: board.views + 1,
      },
    });
    return res
      .status(200)
      .json(
        authUtil.successTrue(
          statusCode.OK,
          responseMessage.SUCCESS_FOUND_ISSUE,
          views
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
