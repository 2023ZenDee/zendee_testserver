const { PrismaClient } = require('@prisma/client');
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
            return res.status(404).send({
              message: '유저를 찾을 수 없습니다.',
            });
          }
      
    
          if (user.userIdx !== userId) {
            return res.status(403).send({
              
              message: '자신의 계정만 삭제할 수 있습니다.',
            });
          }
      
          await prisma.user.delete({
            where: {
              userIdx: num,
            },
          });
      
          return res.status(200).send({
            message: '유저 삭제 성공',
          });
    }catch(err){
        console.error(err);
        return res.status(500).send({
            message : "게시물 정보 못 읽어옴"
        })
    }

}
module.exports = delUser