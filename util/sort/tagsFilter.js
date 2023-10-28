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
          // const postsWithLikesCount = await Promise.all(
          //   posts.map(async (post) => {
          //     const likesCount = await prisma.likes.count({
          //       where: {
          //         likesBad: true,
          //         posterIdx: post.postIdx,
          //       },
          //     });
          //     return {
          //       ...post,
          //       likesCount,
          //     };
          //   })
          // );

          sortedPosts = posts.sort(
            (a, b) => b.likes - a.likes
          );
        } else if (sortBy === "bads") {
          
          // const postsWithLikesCount = await Promise.all(
          //   posts.map(async (post) => {
          //     const badsCount = await prisma.likes.count({
          //       where: {
          //         likesBad: false,
          //         posterIdx: post.postIdx,
          //       },
          //     });
          //     return {
          //       ...post,
          //       badsCount,
          //     };
          //   })
          // );

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
  postData : async(data) =>{
    const result = Promise.all(
      data.map(async(post) =>{
        const posts = await resPost(post);
        return posts;
      })
    )
    return result;
  }
};
