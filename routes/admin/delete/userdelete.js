const { PrismaClient } = require('@prisma/client');
const statusCode = require('../../../module/statusCode');
const adminMessage = require('../../../module/adminMessage');
const authUtil = require('../../../module/authUtil');
const prisma = new PrismaClient();

const userDelete = async(req,res) =>{
    const idx = parseInt(req.params.idx);
    try{
        const user = await prisma.user.findUnique({
            where : {
                userIdx : idx
            }
        })
        if(!user){ 
            return res.status(200).send(
                authUtil.successTrue(statusCode.NOT_FOUND, adminMessage.NOT_FOUND_USER)
            )
        }
        await prisma.user.delete({
            where : {
                userIdx : idx
            }
        })
        return res.status(200).send(
            authUtil.successTrue(statusCode.OK,adminMessage.USER_DELETE)
        )
    }catch(err){
        return res.status(500).send(
            statusCode.INTERNAL_SERVER_ERROR, adminMessage.SERVER_ERROR
        )
    }
}

module.exports = userDelete