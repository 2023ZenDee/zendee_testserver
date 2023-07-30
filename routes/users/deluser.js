const { PrismaClient } = require('@prisma/client');
const authUtil = require('../../module/authUtil');
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const prisma = new PrismaClient();

const delUser = async(req, res) =>{
    const userId = req.user.userIdx;
    try{
        

        const user = await prisma.user.findUnique({
            where: {
              userIdx: num,
            },
          });
      
          if (!user) {
            return res.status(200).send(
              authUtil.successTrue(statusCode.NOT_FOUND, responseMessage.NOT_FOUND_USER)
            );
          }
      
    
          if (user.userIdx !== userId) {
            return res.status(200).send(
              authUtil.successTrue(statusCode.BAD_REQUEST, responseMessage.ONLY_HOST_DELETED)
            );
          }
      
          await prisma.user.delete({
            where: {
              userIdx: num,
            },
          });
      
          return res.status(200).send(
            authUtil.successTrue(statusCode.OK, responseMessage.SUCCESS_USER_DELETED)
          );
    }catch(err){
        console.error(err);
        return res.status(500).send(
          authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FALSE_USER_DELETED)
        )
    }

}
module.exports = delUser