const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const comments = async(req,res) => {
    try{
        const reqPage = req.params;
    const thisPage = parseInt(reqPage.page);
    const { content } = req.body;
    const userId = req.user.userIdx;
     const writeCmt = await prisma.comment.create({
        data : {
            cmtContent : content,
            user : { connect : {userIdx : userId}},
            post :  { connect : { postIdx : thisPage}},
            created_at :  new Date(),
            deleted_at : new Date()
        }
     });
     return res.status(200).send({
        message : "댓글이 성공적으로 업데이트 되었습니다.",
        data:{
            writeCmt
        }
     })
    }catch(err){
        console.error(err);
        return res.status(500).send({
            message : "comment error"
        })
    }
}

module.exports = comments