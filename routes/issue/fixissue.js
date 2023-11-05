const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../module/authUtil");
const statusCode = require("../../module/statusCode");
const responseMessage = require("../../module/responseMessage");
const { validationIssue } = require("../../validation/issuecheck");
const prisma = new PrismaClient();

const fixedIssue = async (req, res) => {
  const { title, content } = req.body;
  try {
    const issueIdx = parseInt(req.params.issueIdx);
    const findIssue = await prisma.post.findUnique({
      where: {
        postIdx: issueIdx,
      },
    });
    const filePath = !req.file ? null : req.file.location;
    
    if(title.length === 0 || content.length===0){
      return res
        .status(400)
        .send(
          authUtil.successTrue(
            statusCode.BAD_REQUEST,
            responseMessage.REQUIRE_ISSUE
          )
        );
    }
    if(!validationIssue(issueIdx) || findIssue === null){
      return res.status(404).send(
        authUtil.successTrue(statusCode.NOT_FOUND, responseMessage.NOT_FOUND_ISSUE)
      )
    }
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
        postImg : filePath,
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
      .status(500)
      .send(
        authUtil.successFalse(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.ISSUE_FIX_SERVER_ERROR
        )
      );
  }
};

module.exports = fixedIssue;
