const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
    commentAuthor : async(commentsIdx) =>{

        const comments = await prisma.comment.findMany({
            where: {
              posterIdx: commentsIdx,
            },
            include : {
              user :true
            }
          });

        comments.map((comment) => {
            comment.userImg = comment.user.image
            comment.user = comment.user.nick
            return comment
          })
          return comments
    }
}