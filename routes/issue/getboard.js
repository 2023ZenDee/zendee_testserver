const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getBoard = async(req, res) =>{
    const page = parseInt(req.params.page);
    try{
        const board = await prisma.post.findUnique({
            where :{
                postIdx : page
            }
        })
        const views = await prisma.post.update({
            where :{
                postIdx : page
            },
            data : {
               views : board.views+1 
            }
        })
        return res.status(200).json({
            message : "게시물 정보 읽어옴",
            data: {
                views
            }
        })
    }catch(err){
        console.error(err);
        return res.status(500).send({
            message : "게시물 정보 못 읽어옴"
        })
    }

}
module.exports = getBoard