const { PrismaClient} = require('@prisma/client');
const authUtil = require('../../../module/authUtil');
const statusCode = require('../../../module/statusCode');
const responseMessage = require('../../../module/responseMessage');
const { commentAuthor } = require('../../../util/response/comment');
const { reportCount } = require('../global/reportcount');
const prisma = new PrismaClient()

const postsDetail = async(req,res) =>{
    const postIdx =parseInt(req.params.postIdx)

    try{
        const findPost = await prisma.post.findUnique({
          where: {
            postIdx: postIdx,
          },
          include: {
            user: true,
            tags: true,
            comment: true,
            postreporter : true
          },
        });
        const tag = await prisma.tag.findUnique({
          where: {
            tagIdx: findPost.tags[0].tagIdx,
          },
        });
        const user = await prisma.user.findUnique({
            where : {
                userIdx : findPost.authorIdx
            }
        });
    
        const author = await commentAuthor(findPost.comment.cmtIdx);
        const postReportCount = await reportCount(findPost.postreporter);
        if(!postReportCount[0]){
          findPost.postreporter = 0
        }
        else{
          findPost.postreporter = parseInt(postReportCount);
        }

        findPost.comment = author;
        findPost.tags = tag.tagName;
        findPost.user = user.nick; 
        

        if(!findPost){
            return res.status(204).send(
                authUtil.successTrue(statusCode.NO_CONTENT,responseMessage.NOT_FOUND_ISSUE)
            )
        }
        return res.status(200).send(
            authUtil.successTrue(statusCode.OK, responseMessage.SUCCESS_FOUND_ISSUE, findPost)
        )
    }catch(err){
        console.log(err);
        return res.status(500).send(
            authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SERVER_ERROR)
        )
    }

}

module.exports = postsDetail