const { PrismaClient} = require('@prisma/client');
const authUtil = require('../../module/authUtil');
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const prisma = new PrismaClient();

const fixMyImg = async(req,res) =>{
    const filePath = !req.file ? null : req.file.location;
    try{
        const updateImg = await prisma.user.update({
            data : {
                image : filePath
            },
            where : {
                userIdx : req.user.userIdx
            }
        });
        return res.status(200).send(
            authUtil.successTrue(statusCode.OK, responseMessage.USER_IMG_FIX, updateImg)
        )

    }catch(err){
        return res.status(500).send(
            authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SERVER_ERROR)
        )
    }
}

module.exports = fixMyImg;