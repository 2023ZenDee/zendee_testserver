const { PrismaClient} = require('@prisma/client');
const authUtil = require('../../module/authUtil');
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const prisma = new PrismaClient();

const fixMyNick = async(req,res) => {
    const  { nick} = req.body;
    try{
        if (!nick || nick.length === 0) {
          return res
            .status(400)
            .send(
              authUtil.successTrue(
                statusCode.BAD_REQUEST,
                responseMessage.REQUIRE_NICK
              )
            );
        }
        await prisma.user.update({
            data : {
                nick,
            },
            where : {
                userIdx : req.user.userIdx
            }
        });
        return res.status(200).send(
            authUtil.successTrue(statusCode.OK, responseMessage.USER_NICK_FIX)
        )
    }catch(err){
        console.log(err);
        res.status(500).send(
            authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SERVER_ERROR)
        )
    }
}

module.exports = fixMyNick