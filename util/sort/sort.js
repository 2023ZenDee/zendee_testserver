const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.sortPost = async (sortBy, address) => {
  let sortedPosts;
  if (sortBy === "views") {
    sortedPosts = await prisma.post.findMany({
      orderBy: {
        views: "desc",
      },
      where : {
        address : {
          contains : address
        }
      },
      include : {
        comment : true,
        tags : true,
        user : true
      }
    });
  }else{

    const posts = await prisma.post.findMany({
        where:{
            address :{
                contains : address,
            }
        },
        include :{
            comment : true,
            tags : true,
            user :true
        }
    })
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
    } else if (sortBy === "comments") {
      const postsWithBadsCount = await Promise.all(
        posts.map(async (post) => {
          const CommentsCount = await prisma.comment.count({
            where: {
              posterIdx: post.postIdx,
            },
          });
          return {
            ...post,
            CommentsCount,
          };
        })
      );
      sortedPosts = postsWithBadsCount.sort(
        (a, b) => b.CommentsCount - a.CommentsCount
      );
    }
  }
   
  return sortedPosts;
};


exports.testSort = async (sortBy, address) => {
  let sortedPosts;
  if (sortBy === "views") {
    sortedPosts = await prisma.post.findMany({
      orderBy: {
        views: "desc",
      },
      where: {
        address: {
          contains: address,
        },
      },
      include: {
        comment: true,
        tags: true,
        user: true,
      },
    });
  } else {
    const posts = await prisma.post.findMany({
      where: {
        address: {
          contains: address,
        },
      },
      include: {
        comment: true,
        tags: true,
        user: true,
      },
    });
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
    } else if (sortBy === "comments") {
      const postsWithBadsCount = await Promise.all(
        posts.map(async (post) => {
          const CommentsCount = await prisma.comment.count({
            where: {
              posterIdx: post.postIdx,
            },
          });
          return {
            ...post,
            CommentsCount,
          };
        })
      );
      sortedPosts = postsWithBadsCount.sort(
        (a, b) => b.CommentsCount - a.CommentsCount
      );
    }
  }

  return sortedPosts;
};