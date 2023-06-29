const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userFix = async(req, res) => {
    try{
        const { nick, image} = req.body;
    const userId = req.user.userIdx; 
    
        await prisma.user.update({
        where:{
            userIdx : userId
        },
        data : {
            nick,
            image
        }
    });
    return res.status(200).send({
        message : "유저 정보 수정 성공"
    })
    }catch(err){
        console.error(err);
        return res.status(500).send({
            message : "유저 정보 수정 실패"
        });
    }


}

module.exports = userFix