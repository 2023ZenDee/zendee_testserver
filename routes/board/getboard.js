const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getBoard = async(req, res) =>{
    const reqPage = req.params;
    const page = parseInt(reqPage.page);
    try{
         const board = await prisma.post.findUnique({
            where : {
                postIdx : page
            }
        });
        return res.status(200).json({
            message : "게시물 정보 읽어옴",
            data: {
                board
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