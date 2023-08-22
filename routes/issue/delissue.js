const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../module/authUtil");
const statusCode = require("../../module/statusCode");
const responseMessage = require("../../module/responseMessage");
const prisma = new PrismaClient();

const deleteIssue = async (req, res) => {
  const page = parseInt(req.params.page);
  const userId = req.user.userIdx;
  
  try {
    const issue = await prisma.post.findUnique({
      where: {
        postIdx: page,
      },
    });
    if (!issue) {
      return res
        .status(200)
        .send(
          authUtil.successTrue(
            statusCode.NOT_FOUND,
            responseMessage.NOT_FOUND_ISSUE
          )
        );
    }
    if (userId !== issue.authorIdx) {
      return res
        .status(200)
        .send(
          authUtil.successTrue(
            statusCode.UNAUTHORIZED,
            responseMessage.ISSUE_ONLY_AUTHOR
          )
        );
    }
    await prisma.$transaction([
      prisma.comment.deleteMany({
        where: {
          posterIdx: page,
        },
      }),
      prisma.tagOnPosts.deleteMany({
        where : {
          postIdx : page
        }
      }),
      prisma.post.delete({
        where: {
          postIdx: page,
        },
      }),
    ]);

    return res
      .status(200)
      .send(
        authUtil.successTrue(
          statusCode.OK,
          responseMessage.ISSUE_DELETE_SUCCESS
        )
      );
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(
        authUtil.successFalse(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.ISSUE_DELETE_FALSE
        )
      );
  }
};

module.exports = deleteIssue;
