const { PrismaClient } = require("@prisma/client");
const { getAddress } = require("./address");
const { likesCount, badsCount, commentsCount } = require("./count");
const prisma = new PrismaClient();
module.exports = {
  resPost: async (board) => {
    const views = await prisma.post.update({
      where: {
        postIdx: board.postIdx,
      },
      data: {
        views: board.views + 1,
      },
      include: {
        tags: true,
        user: true,
        likes: true,
      },
    });
    const tag = await prisma.tag.findUnique({
      where: {
        tagIdx: views.tags[0].tagIdx,
      },
    });
    const findUser = await prisma.user.findUnique({
      where: {
        userIdx: views.user.userIdx,
      },
    });
    const likeCount = await likesCount(views.postIdx);
    const badCount = await badsCount(views.postIdx);
    const cmtCount = await commentsCount(views.postIdx);
    views.tags = tag.tagName;
    views.user = findUser.nick;
    views.userImg = findUser.image;
    views.likes = likeCount;
    views.bads = badCount;
    views.comments = cmtCount;
    return views;
  },
};
