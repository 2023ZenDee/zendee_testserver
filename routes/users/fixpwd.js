const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');

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

        return res.status(200).send({
            message : '비밀번호 변경 성공',
            changedPwd
        })

        
    }catch(err){
        console.error(err);
        return res.status(500).send({
            message : "비밀번호 변경 실패"
        })
    }
}

module.exports = changePwd;