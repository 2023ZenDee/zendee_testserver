const { PrismaClient } = require("@prisma/client");
const authUtil = require("../../../module/authUtil");
const statusCode = require("../../../module/statusCode");
const adminMessage = require("../../../module/adminMessage");
const prisma = new PrismaClient();

const cmtDelete = async (req, res) => {
  const idx = parseInt(req.params.idx);
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        cmtIdx: idx,
      },
    });
    if (!comment) {
      return res
        .status(200)
        .send(
          authUtil.successTrue(
            statusCode.NOT_FOUND,
            adminMessage.NOT_FOUND_COMMENT
          )
        );
    }
    await prisma.$transaction([
        prisma.commentreporter.deleteMany({
            where : {
                commentIdx : idx
            },
        }),
        prisma.comment.delete({
            where : {
                cmtIdx : idx
            }
        })
    ]);
    return res.status(200).send(
        authUtil.successTrue(statusCode.OK, adminMessage.COMMENT_DELETE)
    )
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        authUtil.successFalse(
          statusCode.INTERNAL_SERVER_ERROR,
          adminMessage.SERVER_ERROR
        )
      );
  }
};

module.exports = cmtDelete;
