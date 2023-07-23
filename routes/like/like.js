const {PrismaClient} = require('@prisma/client');
const authUtil = require('../../module/authUtil');
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const prisma = new PrismaClient();

const likePost = async(req, res) => {
    try{
        const postId = parseInt(req.params.postId);
        const { badLikes } = req.body;
        let likeOrBad;
        if(badLikes === true){
            likeOrBad = '좋아요'
        }else{
            likeOrBad = '싫어요'
        }
        const isLike = await prisma.likes.findFirst({
            where: {
                authorIdx: req.user.userIdx ,
                posterIdx: postId 
            }
          });
          if(!isLike ){
            const like = await prisma.likes.create({
                data : {
                    likesBad :Boolean(badLikes),
                    posterIdx : postId,
                    authorIdx : req.user.userIdx
                }
                
            });
            return res.status(200).send({
                status : 201,
                success : true,
                message : `${likeOrBad}가 추가되었습니다`,
                data : like
            })

          }else{
            if(isLike.likesBad !== badLikes){
                const change = await prisma.likes.update({
                    where : {
                        likeIdx :isLike.likeIdx
                    },
                    data : {
                        likesBad : badLikes
                    }
                })
                return res.status(200).send({
                    status : 200,
                    success : true,
                    message : `${!badLikes ? '좋아요' : '싫어요'}가 ${badLikes ? '좋아요' : '싫어요'}로 변경되었습니다.`,
                    data : change
                })

            }else{
                const del = await prisma.likes.delete({
                    where : {
                        likeIdx : isLike.likeIdx
                    }
                });
                    return res.status(200).send({
                        status : 200,
                        success : true,
                        message : `${likeOrBad}가 삭제되었습니다.`,
                        data : del
                    })
                }
            }
            
        }catch(err){
        console.error(err);
        return res.status(500).send(
            authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.LIKE_ERROR)
        )
    }
}

module.exports = likePost;