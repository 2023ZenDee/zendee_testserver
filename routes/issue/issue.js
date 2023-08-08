const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../module/authUtil");
const statusCode = require("../../module/statusCode");
const responseMessage = require("../../module/responseMessage");
const prisma = new PrismaClient();

const issue = async (req, res) => {
  const { title, content, postImg, lat, lng, tag } = req.body;
  const userId = req.user.userId;

  const validTags = ["위험", "안내", "속보"];
  if (!validTags.includes(tag)) {
    return res
      .status(200)
      .send(
        authUtil.successTrue(
          statusCode.BAD_REQUEST,
          responseMessage.INVALID_TAG
        )
      );
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        postImg,
        longitude: parseFloat(lng),
        latitude: parseFloat(lat),
        user: { connect: { userId: userId } },
        deleted_at: new Date(Date.now() + 72 * 60 * 60 * 1000),
        updated_at: new Date(),
        tags: {
          create: {
            tag: {
              create: {
                tagName: tag,
              },
            },
          },
        },
      },
      include: {
        tags: true,
      },
    });

    return res
      .status(200)
      .send(
        authUtil.successTrue(
          statusCode.CREATED,
          responseMessage.SUCCESS_CREATED_ISSUE,
          //newPost
        )
      );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        authUtil.successFalse(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.FALSE_CREATED_ISSUE
        )
      );
  }
};

module.exports = issue;
