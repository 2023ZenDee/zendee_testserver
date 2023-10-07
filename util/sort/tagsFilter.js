const { PrismaClient } = require("@prisma/client");
const { resPost } = require("../response/post");
const prisma = new PrismaClient();

module.exports = {
  filterIssueByQuery: async (sortBy) => {
    let sortedPosts;
      if (sortBy === "views") {
        sortedPosts = await prisma.post.findMany({
          orderBy: {
            views: "desc",
          },
          include: {
            tags: true,
          },
        });
      } else {
        const posts = await prisma.post.findMany({
          include : {
            tags : true,
          }
        });
         
        // if(!posts){
        //   return;
        // }
        if (sortBy === "likes") {
          const postsWithLikesCount = await Promise.all(
            posts.map(async (post) => {
              const likesCount = await prisma.likes.count({
                where: {
                  likesBad: true,
                  posterIdx: post.postIdx,
                },
              });
              return {
                ...post,
                likesCount,
              };
            })
          );

          sortedPosts = postsWithLikesCount.sort(
            (a, b) => b.likesCount - a.likesCount
          );
        } else if (sortBy === "bads") {
          const postsWithLikesCount = await Promise.all(
            posts.map(async (post) => {
              const badsCount = await prisma.likes.count({
                where: {
                  likesBad: false,
                  posterIdx: post.postIdx,
                },
              });
              return {
                ...post,
                badsCount,
              };
            })
          );

          sortedPosts = postsWithLikesCount.sort(
            (a, b) => b.likesCount - a.likesCount
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
          // post에 해당 태그가 포함된 경우만 반환
          return post;
        }

        return null; // 태그가 없는 경우 null 반환
      })
    );

    // null이 아닌 포스트만 필터링
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
