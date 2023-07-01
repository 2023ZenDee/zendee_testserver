const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const myIssue = async(req,res) =>{
    try{
        const userIdx = req.user.userIdx;

        const findMyIssue = await prisma.post.findMany({
            where : {
                author : {
                    userIdx,
                }
            }
        })
        console.log(findMyIssue);
        if(!findMyIssue){
            return res.status(200).send({
                message : "내가 올린 이슈가 없습니다."
            })
        }
        return res.status(200).send({
            message : "이슈 찾기 성공",
            data : {
                findMyIssue
            }
        })
        
    }catch(err){
        console.error(err);
        return res.status(500).send({
            message : "이슈 못 받아옴."
        })
    }
}

module.exports = myIssue