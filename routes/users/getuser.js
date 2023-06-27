const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUser = async(req, res) => {
    try{
        const user = await req.user;
        const userData = {
            nick : user.nick,
            image : user.image,
            email : user.email,
        }
        return res.status(200).send({
            message : '유저 조회 성공',
            data : {
                userData
            }
        })
    }catch(err){
        console.error(err);
        return res.status(500).send({
            message : '유저 못읽어옴'
        })
    }
}

module.exports = getUser