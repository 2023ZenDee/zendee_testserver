const { PrismaClient } = require("@prisma/client");
const { resPost } = require("../response/post");
const prisma = new PrismaClient();

module.exports = {
  filterIssueByQuery: async (sortBy, posts) => {
  
    let sortedPosts;
      if (sortBy === "views") {
        sortedPosts = posts.sort((a,b) => b.views - a.views);
      } else { 
        if (sortBy === "likes") {

          sortedPosts = posts.sort(
            (a, b) => b.likes - a.likes
          );
        } else if (sortBy === "bads") {

          sortedPosts = posts.sort(
            (a, b) => b.bads - a.bad
          );
        }
      }
    

    return sortedPosts;
  },
  filterIssueByTag: async (sortedPosts, tagName) => {
  
    const result = await Promise.all(
      sortedPosts.map(async (post) => {
        const matchingTags = await prisma.tag.findMany({
          where: {
            post: {
              some: {
                postIdx: post.postIdx,
              },
            },
            tagName: tagName,
          },
        });

        if (matchingTags.length > 0) {
      
          return post;
        }

        return null;
      })
    );

    const filteredPosts = result.filter((post) => post !== null);

    return filteredPosts;
  },
};
