const { PrismaClient} = require('@prisma/client');
const authUtil = require('../../module/authUtil');
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const prisma = new PrismaClient();

const userReport = async(req, res) =>{
    const receiver = parseInt(req.params.idx);
    const { content } = req.body;
    try{
        const findUser = await prisma.user.findUnique({
            where : {
                userIdx : receiver
            }
        });
        if(!findUser){
            return res.status(200).send(
                authUtil.successTrue(statusCode.NO_CONTENT, responseMessage.NOT_FOUND_USER)
            )
        }

        await prisma.userreporter.create({
            data : {
                userReportContent : content,
                receiver : receiver,
                sender : req.user.userIdx
            }
        });
        return res.status(200).send(
            authUtil.successTrue(statusCode.CREATED, responseMessage.USER_REPORTED_SUCCESS)
        )
    }catch(err){
        console.log(err);
        return res.status(500).send(
            authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.USER_REPORTED_FALSE)
        )
    }
}

module.exports = userReport