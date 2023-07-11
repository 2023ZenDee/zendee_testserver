const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient;

const crypto = require('crypto');


const register = async(req,res) =>{
    const { user_id, nick, email, password} = req.body;
    const hashPwd = crypto.createHash("sha512").update(password).digest("base64");
    try{
        console.log(req.body);
        const ifUser = await prisma.user.findUnique({
            where:{
                userId : user_id,
            },
        });
        //console.log(`ifUser === null : ${ifUser === null}`);
        if(ifUser === null){
            const user = {
                userId :user_id,
                nick : nick,
                email : email,
                password : hashPwd,

                
            }

            await prisma.user.create({
                data:user,
            });

            return res.status(200).json({
                message : "회원가입 성공",
                
            });
        }else{
            return res.status(409).json({message : "이미 존재하는 아이디입니다."});
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: "signUp오류"})
    }
}

module.exports = register;