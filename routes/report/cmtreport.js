const { PrismaClient} = require('@prisma/client');
const authUtil = require('../../module/authUtil');
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const prisma = new PrismaClient();

const issueReport = async(req,res) =>{
    const cmtIdx = parseInt(req.params.idx);
    const { content } = req.body;
    try{
        const findComment = await prisma.comment.findUnique({
            where : {
                cmtIdx
            }
        })
        const reported = await prisma.commentreporter.create({
            data : {
                cmtReportContent : content,
                comment : { connect : {
                    cmtIdx
                }},
                user : { connect : {
                    userIdx : req.user.userIdx
                }},
                cmtReported_at : new Date(),

            }
        });
        return res.status(200).send({
            stauts : 201,
            success : true,
            message  : `${findComment.cmtContent} 댓글이 신고되었습니다.`,
            reported
        })
    }catch(err){
        console.log(err);
        return res.status(500).send(
            authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.COMMENT_REPORT_ERROR)
        )
    }
}

module.exports = issueReport