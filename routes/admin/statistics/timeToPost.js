const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../../module/authUtil");
const statusCode = require("../../../module/statusCode");
const responseMessage = require("../../../module/responseMessage");
const timeForm = require('../global/form/time')
const prisma = new PrismaClient();

const postByTime = async (req, res) => {
  try {
    timeForm.forEach(async(form)=>{
      form.value = 0;
    })
     const postCountsByHour = await prisma.$queryRaw`
      SELECT
        DATE_FORMAT(created_at, "%H") AS hour,
        COUNT(*) AS count
      FROM
        post
      GROUP BY
        hour
    `;
     const result = postCountsByHour.map((entry) => ({
       hour: Number(entry.hour),
       value: Number(entry.count),
     }));
     await Promise.all(
        result.map(async(post)=>{
          timeForm.forEach(async(form)=>{
            if(post.hour === form.time){
              form.value += post.value;
            }
          })
        })
     )
     timeForm.forEach((post) => {
      post.time = post.time.toString()
     })
     
    return res
      .status(200)
      .send(
        authUtil.successTrue(
          statusCode.OK,
          responseMessage.TIME_BY_ISSUE,
          timeForm
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
