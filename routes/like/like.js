const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const likePost = async(req, res) => {
    try{
        const postId = req.params;
        const post = parseInt(postId.postId)
        const { badLikes } = req.body;
        const like = await prisma.likes.create({
            data : {
                likesBad :Boolean(badLikes),
                posterIdx : post,
                authorIdx : req.user.userIdx
            }
        });
        return res.status(200).send({
            message : '좋아요 또는 싫어요 추가 성공',
            like
        })
    }catch(err){
        console.error(err);
        return res.status(500).send({
            message : "좋아요 누르기 실패"
        })
    }
}

module.exports = likePost;