const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../module/authUtil");
const statusCode = require("../../module/statusCode");
const responseMessage = require("../../module/responseMessage");
const prisma = new PrismaClient();

const fixedIssue = async (req, res) => {
  const { title, content, postImg } = req.body;
  try {
    const issueIdx = parseInt(req.params.issueIdx);
    const findIssue = await prisma.post.findUnique({
      where: {
        postIdx: issueIdx,
      },
    });

    if (req.user.userIdx !== findIssue.authorIdx) {
      return res
        .status(200)
        .send(
          authUtil.successTrue(
            statusCode.UNAUTHORIZED,
            responseMessage.ISSUE_ONLY_AUTHOR
          )
        );
    }
    const updatedIssue = await prisma.post.update({
      where: {
        postIdx: issueIdx,
      },
      data: {
        title,
        content,
        postImg,
      },
    });
    return res
      .status(200)
      .send(
        authUtil.successTrue(
          statusCode.OK,
          responseMessage.ISSUE_FIX_SUCCESS,
          updatedIssue
        )
      );
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .send(
        authUtil.successFalse(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.ISSUE_FIX_SERVER_ERROR
        )
      );
  }
};

module.exports = fixedIssue;
