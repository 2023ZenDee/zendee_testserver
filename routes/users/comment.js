const { PrismaClient} = require('@prisma/client');
const authUtil = require('../../module/authUtil');
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const prisma = new PrismaClient();

const myCmts = async(req,res) =>{
    try{
        const myComments = await prisma.comment.findMany({
            where : {
                authorIdx : req.user.userIdx
            }
        });
        if(myComments.length === 0){
            return res.status(200).send(
                authUtil.successTrue(statusCode.NO_CONTENT, responseMessage.EMPRY_MY_COMMENT)
            )
        }
        return res.status(200).send(
            authUtil.successTrue(statusCode.OK, responseMessage.MY_COMMENTS_GET_SUCCESS, myComments)
        )
    }catch(err){
        console.log(err);
        authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.MY_COMMENTS_GET_FALSE);
    }

}

module.exports  = myCmts;