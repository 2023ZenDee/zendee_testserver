const { PrismaClient, Prisma } = require("@prisma/client");
const authUtil = require("../../../module/authUtil");
const statusCode = require("../../../module/statusCode");
const responseMessage = require("../../../module/responseMessage");
const prisma = new PrismaClient();

const postByTime = async (req, res) => {
  try {
    const hourlyCounts = [];
    const date = "2023-10-28";

    for (let hour = 0; hour < 24; hour++) {
      const startHour = new Date(date);

      startHour.setHours(hour + 9, 0, 0, 0);

      const endHour = new Date(startHour);
      endHour.setHours(hour + 1 + 9);
      const postCount = await prisma.post.count({
        where: {
          created_at: {
            gte: startHour,
            lte: endHour,
          },
        },
      });
      value = postCount;
      

      hourlyCounts.push({ hour, value });
    }

    return res
      .status(200)
      .send(
        authUtil.successTrue(
          statusCode.OK,
          responseMessage.TIME_BY_ISSUE,
          hourlyCounts
        )
      );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        authUtil.successFalse(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.SERVER_ERROR
        )
      );
  }
};
module.exports = postByTime;
