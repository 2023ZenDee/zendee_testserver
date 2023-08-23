const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');

module.exports = {
    isExistSnsId : async(type, snsId)=>{
        try{
            const result = await prisma.socialLogin.findUnique({
                where: {
                    type,
                    snsId,
                }
            });
            if(result.socialIdx){
                return result.socialIdx;
            }else{
                throw new Error();
            }
        }catch(error){
            return false;
        }
    },
    snsSignUp : async({email , nick ,snsId, type}) =>{
        const {password} = req.body;
        const hashPwd = crypto.createHash("sha512").update(password).digest("base64");
        if(email && nick){
            try{
                const user = await prisma.user.create({
                    userId : email,
                    email : email,
                    nick,
                    password : hashPwd,
                    image : "null"
                });
                const socialLogin = await prisma.socialLogin.create({
                    snsId,
                    type,
                    userIdx : user.userIdx
                });
                return user.userIdx;
            }catch(e){
                console.log(e);
                return false;
            }
        }
    }
}