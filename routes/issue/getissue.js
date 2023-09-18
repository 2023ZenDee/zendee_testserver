const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../module/authUtil");
const statusCode = require("../../module/statusCode");
const responseMessage = require("../../module/responseMessage");
const { resPost } = require("../../util/response/post");
const prisma = new PrismaClient();

const getIssue = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const filteringIssue = await prisma.post.findMany({
      where: {
        latitude: {
          gte: parseFloat(lat) - 0.02,
          lte: parseFloat(lat) + 0.02,
        },
        longitude: {
          gte: parseFloat(lng) - 0.02,
          lte: parseFloat(lng) + 0.02,
        },
        deleted_at: {
          not: new Date(),
        },
      },
    });
    //현지 위치에서 2km 반경 이내에 게시물 필터링
    if (!filteringIssue[0]) {
      return res
        .status(200)
        .send(
          authUtil.successTrue(
            statusCode.NO_CONTENT,
            responseMessage.MY_AROUND_NOTFOUND_ISSUE
          )
        );
    }
    const issues = await Promise.all(
      filteringIssue.map(async (post) => {
        const result = await resPost(post);
        return result;
      })
    );

    return res
      .status(200)
      .send(
        authUtil.successTrue(
          statusCode.OK,
          responseMessage.SUCCESS_FOUND_ISSUE,
          issues
        )
      );
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .send(
        authUtil.successFalse(statusCode.OK, responseMessage.FALSE_FOUND_ISSUE)
      );
  }
};

module.exports = getIssue;
