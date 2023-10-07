const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
  reportCount: async (posts) => {
    const reportCounts = await Promise.all(
      posts.map(async (post) => {
        const postReportCount = await prisma.postreporter.count({
          where: {
            posterIdx: post.posterIdx,
          },
        });
        return postReportCount;
      })
    );
    return reportCounts;
  },
};
