const { PrismaClient} = require('@prisma/client');
const authUtil = require('../../../module/authUtil');
const statusCode = require('../../../module/statusCode');
const adminMessage = require('../../../module/adminMessage');
const prisma = new PrismaClient();

const userDetail = async(req,res) => {
    try{
        const userId = parseInt(req.params.userIdx);
        
        const findUser = await prisma.user.findUnique({
            where:{
                userIdx : userId
            }
        });
        if(!findUser){
            return res.status(404).send(
                authUtil.successTrue(statusCode.NOT_FOUND,adminMessage.NOT_FOUND_USER)
            )
        }
        const data = {
            userId : findUser.userId,
            nick : findUser.nick,
            email : findUser.email,
        }

        return res.status(200).send(
            authUtil.successTrue(statusCode.OK, adminMessage.USER_FOUND_SUCCESS, data)
        )

    }catch(err){
        console.log(err);
        return res.status(500).send(
            authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, adminMessage.SERVER_ERROR)
        )
    }
}

module.exports = userDetail;