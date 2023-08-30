const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../../module/authUtil");
const statusCode = require("../../../module/statusCode");
const adminMessage = require("../../../module/adminMessage");
const prisma = new PrismaClient();
const getReportedComment = async (req, res) => {
  try {
    const reportedIssue = await prisma.commentreporter.findMany();
    return res
      .status(200)
      .send(
        authUtil.successTrue(
          statusCode.OK,
          adminMessage.REPORTED_COMMENT_SUCCESS,
          reportedIssue
        )
      );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        authUtil.successFalse(
          statusCode.INTERNAL_SERVER_ERROR,
          adminMessage.REPORTED_COMMENT_FALSE
        )
      );
  }
};

module.exports = getReportedComment;
