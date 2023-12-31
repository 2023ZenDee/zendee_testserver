const { PrismaClient } = require("@prisma/client");
const { likesCount, badsCount, commentsCount } = require("./count");
const { commentAuthor } = require("./comment");
const prisma = new PrismaClient();
module.exports = {
  resPost: async (board) => {
    const findPost = await prisma.post.findUnique({
      where: {
        postIdx: board.postIdx,
      },
      include: {
        tags: true,
        user: true,
        likes: true,
      },
    });
    const tag = await prisma.tag.findUnique({
      where: {
        tagIdx: findPost.tags[0].tagIdx,
      },
    });
    const likeCount = await likesCount(findPost.postIdx);
    const badCount = await badsCount(findPost.postIdx);
    const cmtCount = await commentsCount(findPost.postIdx);
    let likeOrBad = null;
    if (findPost.likes[0]) {
      const userLikesPost = await prisma.likes.findFirst({
        where: {
          likeIdx : findPost.likes[0].likeIdx
        },
      });
      likeOrBad = userLikesPost.likesBad;
    }

    findPost.tags = tag.tagName;
    findPost.user = findPost.user.nick;
    findPost.userImg = findPost.user.image;
    findPost.likes = likeCount;
    findPost.userLikesPost = likeOrBad;
    findPost.bads = badCount;
    findPost.comments = cmtCount;
    return findPost;
  },
  manyPost: async (sortedPost) => {
    const result = await Promise.all(
      sortedPost.map(async (post) => {
        const author = await commentAuthor(post.comment.cmtIdx);
        const tag = await prisma.tag.findUnique({
          where: {
            tagIdx: post.tags[0].tagIdx,
          },
        });
        const user = await prisma.user.findUnique({
          where: {
            userIdx: post.authorIdx,
          },
        });

        post.comment = author;
        post.tags = tag.tagName;
        post.user = user.nick;
        return post;
      })
    );
    return result;
  },
};
