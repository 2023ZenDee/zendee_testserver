const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../../module/authUtil");
const statusCode = require("../../../module/statusCode");
const adminMessage = require("../../../module/adminMessage");
const prisma = new PrismaClient();

const issueDelete = async (req, res) => {
  const idx = parseInt(req.params.idx);
  try {
    const issue = await prisma.post.findUnique({
      where: {
        postIdx: idx,
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
    await prisma.$transaction([
      prisma.comment.deleteMany({
        where: {
          posterIdx: idx,
        },
      }),
      prisma.tagOnPosts.deleteMany({
        where: {
          postIdx: idx,
        },
      }),
      prisma.post.delete({
        where: {
          postIdx: idx,
        },
      }),
    ]);

    return res
      .status(200)
      .send(authUtil.successTrue(statusCode.OK, adminMessage.ISSUE_DELETE));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        authUtil.successFalse(
          statusCode.INTERNAL_SERVER_ERROR,
          adminMessage.SERVER_ERROR
        )
      );
  }
};

module.exports = issueDelete;
