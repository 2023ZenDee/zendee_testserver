const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const delUser = async(req, res) =>{
    const userNum = req.params;
    const num = parseInt(userNum.num);
    try{
         const userDel = await prisma.user.delete({
            where : {
                userIdx : num
            }
        });
        return res.status(200).json({
            message : "유저 삭제 성공",
        })
    }catch(err){
        console.error(err);
        return res.status(500).send({
            message : "게시물 정보 못 읽어옴"
        })
    }

}
module.exports = delUser