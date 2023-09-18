const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
module.exports ={
    likesCount : async(posterIdx) =>{
        const count = await prisma.likes.count({
            where: {
              likesBad: true,
              posterIdx: posterIdx,
            },
          });
          return count
    },
    badsCount : async(posterIdx) =>{
        const count = await prisma.likes.count({
            where: {
              likesBad: false,
              posterIdx: posterIdx,
            },
          });
          return count
    },
    commentsCount : async(posterIdx) =>{
        const count = await prisma.comment.count({
            where: {
              posterIdx : posterIdx,
            },
          });
          return count
    }


}