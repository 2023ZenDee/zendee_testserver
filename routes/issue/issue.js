const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../module/authUtil");
const statusCode = require("../../module/statusCode");
const responseMessage = require("../../module/responseMessage");
const { getAddress } = require("../../util/response/address");
const prisma = new PrismaClient();

const issue = async (req, res) => {
  const { title, content, lat, lng, tag, deleted_at } = req.body;
  const currentTime = new Date()
  currentTime.setMinutes(currentTime.getMinutes() + parseInt(deleted_at))
  currentTime.setHours(currentTime.getHours() + 9) 
  const expired_at = currentTime
  console.log(expired_at)
  const validTags = ["경고", "뜨거움", "재미", "행운", "공지", "활동", "사랑"];
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
    const img = `img/${req.file.filename}`;
    const address = await getAddress(lat, lng);
    console.log(address)
    if(!address){
      return res
        .status(400)
        .send(
          authUtil.successTrue(
            statusCode.BAD_REQUEST,
            responseMessage.ADDRESS_GET_FALSE
          )
        );
    }
    await prisma.post.create({
      data: {
        title,
        content,
        postImg: img,
        longitude: parseFloat(lng),
        latitude: parseFloat(lat),
        address: address,
        user: { connect: { userIdx: req.user.userIdx } },
        deleted_at: expired_at,
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

    return res.status(200).send(
      authUtil.successTrue(
        statusCode.CREATED,
        responseMessage.SUCCESS_CREATED_ISSUE
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
