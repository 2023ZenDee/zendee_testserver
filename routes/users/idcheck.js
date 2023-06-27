const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const check = async(req,res) => {
    const { user_id } = req.body;
    const findUser = await prisma.user.findUnique({ where:{
        userId : user_id
    } });

    if(findUser !== null){
        return res.status(400).json({
            ok : false,
            message : '이미 있는 아이디 입니다.'
        })
    }
    return res.json({
        ok:true,
        message : '사용가능한 아이디입니다.'
    });
}

module.exports = check;