const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../module/authUtil");
const statusCode = require("../../module/statusCode");
const responseMessage = require("../../module/responseMessage");
const prisma = new PrismaClient();

module.exports = {
  userLikes: async (req, res) => {
    try {
      const myLikes = await prisma.post.findMany({
        where: {
          likes: {
            some: {
              authorIdx: req.user.userIdx,
              likesBad: true,
            },
          },
        },
      });
      if (myLikes.length === 0) {
        return res
          .status(200)
          .send(
            authUtil.successTrue(
              statusCode.NO_CONTENT,
              responseMessage.MY_LIKE_EMPTY
            )
          );
      }
      return res
        .status(200)
        .send(
          authUtil.successTrue(
            statusCode.OK,
            responseMessage.MY_LIKE_ISSUE,
            myLikes
          )
        );
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send(
          authUtil.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.MY_LIKE_SERVER_ERROR
          )
        );
    }
  },
  userBads: async (req, res) => {
    try {
      const myBads = await prisma.post.findMany({
        where: {
          likes: {
            some: {
              authorIdx: req.user.userIdx,
              likesBad: false,
            },
          },
        },
      });
      if (myBads.length === 0) {
        return res
          .status(200)
          .send(
            authUtil.successTrue(
              statusCode.NO_CONTENT,
              responseMessage.MY_BAD_EMPTY
            )
          );
      }
      return res
        .status(200)
        .send(
          authUtil.successTrue(
            statusCode.OK,
            responseMessage.MY_BAD_ISSUE,
            myBads
          )
        );
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send(
          authUtil.successFalse(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.MY_BAD_SERVER_ERROR
          )
        );
    }
  },
};
