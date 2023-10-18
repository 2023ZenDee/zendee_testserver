const {PrismaClient} = require('@prisma/client');
const authUtil = require('../../module/authUtil');
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const { filterIssueByTag, filterIssueByQuery, postData } = require('../../util/sort/tagsFilter');
const { validTag } = require('../../validation/validateTag');
const prisma = new PrismaClient();


const issueRanked = async(req,res) =>{
    const {sortBy} = req.query;
    const { tags} = req.body;
    let postsToSort;
    try{
      const resultTag = await validTag(tags);
      switch(sortBy){
        case "views" :
            postsToSort = await prisma.post.findMany({
                orderBy: {
                    views : "desc",
                },
                include : {
                    tags : true,
                }
                
            }) 
            break;
        case "likes" :
        case "bads" :
           postsToSort = await prisma.post.findMany({
             include: {
               tags: true,
             },
           });
           break;
        default :
            break;
      }
      if (postsToSort.length === 0) {
        return res
          .status(200)
          .send(
            authUtil.successTrue(
              statusCode.NO_CONTENT,
              responseMessage.NO_ISSUE
            )
          );
      }
    
      const postsByTags = await Promise.all(
        resultTag.map(async (tagName) => {
          return await filterIssueByTag(postsToSort, tagName);
        })
      );

      const filteredPosts = postsByTags.flat();

      const joinToPost = await postData(filteredPosts);
      if (!joinToPost) {
        return res
          .status(200)
          .send(
            authUtil.successTrue(
              statusCode.NO_CONTENT,
              responseMessage.NO_ISSUE
            )
          );
      }

      const result = await filterIssueByQuery(sortBy,joinToPost);
      

      return res
        .status(200)
        .send(
          authUtil.successTrue(
            statusCode.OK,
            responseMessage.RANK_SORT_SUCCESS,
            result
          )
        );
    }catch(e){
        console.log(e)
        return res.status(500).send(
            authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SERVER_ERROR)
        );
    }
}

module.exports = issueRanked