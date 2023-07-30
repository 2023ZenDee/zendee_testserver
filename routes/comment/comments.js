const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../module/authUtil");
const statusCode = require("../../module/statusCode");
const responseMessage = require("../../module/responseMessage");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    try {
      const reqIssue = parseInt(req.params.issue);
      const { content } = req.body;
      const userId = req.user.userIdx;
      const writeCmt = await prisma.comment.create({
        data: {
          cmtContent: content,
          user: { connect: { userIdx: userId } },
          post: { connect: { postIdx: reqIssue } },
          created_at: new Date(),
        },
      });
      return res
        .status(200)
        .send(
          authUtil.successTrue(
            statusCode.CREATED,
            responseMessage.COMMENT_CREATED,
            writeCmt
          )
        );
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .send(
          authUtil.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.COMMENT_CREATED_SERVER_ERROR
          )
        );
    }
  },
  read: async (req, res) => {
    try {
      const reqIssue = parseInt(req.params.issue);
      const comments = await prisma.comment.findMany({
        where: {
          posterIdx: reqIssue,
        },
      });
      if (comments.length === 0) {
        return res
          .status(200)
          .send(
            authUtil.successTrue(
              statusCode.NO_CONTENT,
              responseMessage.COMMENT_NO_CONTENT
            )
          );
      } else {
        return res
          .status(200)
          .send(
            authUtil.successTrue(
              statusCode.OK,
              responseMessage.COMMENT_GET_SUCCESS,
              comments
            )
          );
      }
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send(
          authUtil.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.COMMENT_GET_SERVER_ERROR
          )
        );
    }
  },
  update: async (req, res) => {
    try {
      const reqCmtIdx = parseInt(req.params.cmtIdx);
      const { fixedcontent } = req.body;
      const getCmt = await prisma.comment.findUnique({
        where: {
          cmtIdx: reqCmtIdx,
        },
      });
      if (getCmt.authorIdx !== req.user.userIdx) {
        return res
          .status(200)
          .send(
            authUtil.successTrue(
              statusCode.UNAUTHORIZED,
              responseMessage.COMMENT_NOT_AUTHOR
            )
          );
      }

      const updateCmt = await prisma.comment.update({
        where: {
          cmtIdx: getCmt.cmtIdx,
        },
        data: {
          cmtContent: fixedcontent,
        },
      });

      return res
        .status(200)
        .send(
          authUtil.successTrue(
            statusCode.OK,
            responseMessage.COMMENT_UPDATE_SUCCESS,
            updateCmt
          )
        );
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send(
          authUtil.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.COMMENT_UPDATE_FALSE
          )
        );
    }
  },
  delete: async (req, res) => {
    try {
      const delCmtIdx = parseInt(req.params.cmtIdx);

      const getCmt = await prisma.comment.findUnique({
        where: {
          cmtIdx: delCmtIdx,
        },
      });
      if (getCmt.authorIdx !== req.user.userIdx) {
        return res
          .status(200)
          .send(
            authUtil.successTrue(
              statusCode.UNAUTHORIZED,
              responseMessage.COMMENT_ONLY_AUTHOR
            )
          );
      }
      const deleteCmt = await prisma.comment.delete({
        where: {
          cmtIdx: getCmt.cmtIdx,
        },
      });

      return res
        .status(200)
        .send(
          authUtil.successTrue(
            statusCode.OK,
            responseMessage.COMMENT_DELETE,
            deleteCmt
          )
        );
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send(
          authUtil.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.COMMENT_DELETE_SERVER_ERROR
          )
        );
    }
  },
};
