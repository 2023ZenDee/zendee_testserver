const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const deleteIssue = async(req,res)=> {
    const param = req.params;
    const page = parseInt(param.page);
    const userId = req.user.userIdx;
    console.log(page);
    try{
        
        const issue = await prisma.post.findUnique({
            where : { 
                postIdx: page,
                
            }
        })
        if(!issue){
            return res.status(404).send({
                message : "게시물을 찾을 수 없습니다."
            });
        }
        if(userId !== issue.authorIdx){
            return res.status(409).send({
                message : "자신이 작성한 게시물만 삭제 가능합니다."
            });
        }
        await prisma.post.delete({
            where : {
                postIdx : page
            }
        })
        

        return res.status(200).send({
            message : '게시물 삭제 성공'
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            message : "게시물 삭제 실패"
        })
    }
} 

module.exports = deleteIssue