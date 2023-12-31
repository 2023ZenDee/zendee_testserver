const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../../module/authUtil");
const statusCode = require("../../../module/statusCode");
const adminMessage = require("../../../module/adminMessage");
const { postCountDataByTag } = require("../global/adminResponse");
const prisma = new PrismaClient();

const postByTag = async (req, res) => {
  const allTags = await prisma.tag.findMany();
  try {
    const postCount = await Promise.all(
      allTags.map(async (tag) => {
        const posts = await prisma.post.findMany({
          where: {
            tags: {
              some: {
                tagIdx: tag.tagIdx,
              },
            },
          },
        });
        return { tag: tag.tagName, posts };
      })
    );
    
    const result = await postCountDataByTag(postCount);
    return res
      .status(200)
      .send(
        authUtil.successTrue(
          statusCode.OK,
          adminMessage.TAG_BY_ISSUE_SUCCESS,
          result
        )
      );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        authUtil.successFalse(
          statusCode.INTERNAL_SERVER_ERROR,
          adminMessage.TAG_BY_ISSUE_ERROR
        )
      );
  }
};

module.exports = postByTag;