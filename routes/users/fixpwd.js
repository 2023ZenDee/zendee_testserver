const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');
const authUtil = require('../../module/authUtil');
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');

const changePwd = async(req,res) => {
    try{
        const userId = req.user.userIdx;
        const { password } = req.body;
        const hashedPwd = crypto.createHash('sha512').update(password).digest('base64');
        const changedPwd = await prisma.user.update({
            where:{
                userIdx : userId
            },
            data :{
                password : hashedPwd
            }
        })

        return res.status(200).send(
            authUtil.successTrue(statusCode.OK, responseMessage.SUCCESS_PASSWORD_CHANGED, changedPwd)
        )

        
    }catch(err){
        console.error(err);
        return res.status(500).send(
            authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FALSE_PASSWORD_CHANGED)
        )
    }
}

module.exports = changePwd;