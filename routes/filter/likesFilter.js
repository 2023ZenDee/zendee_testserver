const { PrismaClient} = require('@prisma/client');
const authUtil = require('../../module/authUtil');
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const prisma = new PrismaClient();

const likesFilter = async(req,res)=>{
    const { sortBy } = req.query;
    try{
        let sortedPosts;
        if(sortBy === 'views'){
            sortedPosts = await prisma.post.findMany({
                orderBy : {
                    views : 'desc'
                }
            });
        }else if(sortBy === 'likes'){
            const posts = await prisma.post.findMany();
            const postsWithLikesCount = await Promise.all(
                posts.map(async(post)=>{
                    const likesCount = await prisma.likes.count({
                        where:{
                            likesBad : true,
                            posterIdx : post.postIdx
                        }
                    });
                    return{
                        ...post,
                        likesCount,
                    }
                })
            );
            sortedPosts = postsWithLikesCount.sort((a,b)=> b.likesCount - a.likesCount);
            
    }else if(sortBy === 'bads'){
        const posts = await prisma.post.findMany();
        const postsWithBadsCount = await Promise.all(
            posts.map(async(post)=>{
                const BadsCount = await prisma.likes.count({
                    where:{
                        likesBad : false,
                        posterIdx : post.postIdx
                    }
                });
                return{
                    ...post,
                    BadsCount,
                }
            })
        );
        sortedPosts = postsWithBadsCount.sort((a,b)=> b.BadsCount - a.BadsCount);
        }
        return res.status(200).send(
            authUtil.successTrue(statusCode.OK, responseMessage.SUCCESS_SORT,sortedPosts)
        )
    }catch(err){
        console.log(err);
        return res.status(500).send(
            authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FALSE_SORT)
        )
    }
}

module.exports = likesFilter