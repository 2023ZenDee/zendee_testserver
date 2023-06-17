const { PrismaClient} = require('@prisma/client');
const crypto = require('crypto');
const prisma = new PrismaClient();




const login = async(req, res) =>{
    try{
        const { user_id,  password} = req.body;
        const hashedLoginPassword = crypto.createHash('sha512').update(password).digest('base64');
        console.log(`loginPassword : ${hashedLoginPassword}, password : ${password}`);
        const loginUser = await prisma.user.findUnique({
            where:{
                userId : user_id,
            },
        });
        
        if(loginUser === null){
            return res.status(400).json({
                ok:false,
                message : '존재하지 않는 아이디입니다.'
            })
        }
        if(loginUser.password !== hashedLoginPassword){
            return res.status(400).json({
                ok:false,
                message: '틀린 비밀번호 입니다.'
            })
        }

        return res.status(200).json({
            ok:true,
            loggedinId : user_id,
            message : "로그인 성공"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            message : "login 오류"
        })
    }
}

module.exports = login;