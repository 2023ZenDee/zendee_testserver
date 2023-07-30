const {PrismaClient} = require('@prisma/client');
const authUtil = require('../../module/authUtil');
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const prisma = new PrismaClient();

const myIssue = async(req,res) =>{
    try{
        const userIdx = req.user.userIdx;

        const findMyIssue = await prisma.post.findMany({
            where : {
                author : {
                    userIdx,
                }
            }
        })
        console.log(findMyIssue);
        if(!findMyIssue){
            return res.status(200).send(
                authUtil.successTrue(statusCode.NO_CONTENT, responseMessage.EMPTY_MY_ISSUE)
            )
        }
        return res.status(200).send(
            authUtil.successTrue(statusCode.OK, responseMessage.SUCCESS_GET_MY_ISSUE)
        )
        
    }catch(err){
        console.error(err);
        return res.status(500).send(
            authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FALSE_GET_MY_ISSUE)
        )
    }
}

module.exports = myIssue