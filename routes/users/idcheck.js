const { PrismaClient} = require('@prisma/client');
const authUtil = require('../../module/authUtil');
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const prisma = new PrismaClient();
const check = async(req,res) => {
    const { user_id } = req.body;
    const findUser = await prisma.user.findUnique({ where:{
        userId : user_id
    } });

    if(findUser !== null){
        return res.status(200).send(
            authUtil.successTrue(statusCode.BAD_REQUEST, responseMessage.ALREADY_HAVE_ID)
        )
    }
    return res.status(200).send(
        authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.OK_USE_ID)
    );
}

module.exports = check;