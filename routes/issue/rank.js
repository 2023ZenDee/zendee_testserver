const {PrismaClient} = require('@prisma/client');
const authUtil = require('../../module/authUtil');
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const { filterIssueByTag, filterIssueByQuery, postData } = require('../../util/sort/tagsFilter');
const prisma = new PrismaClient();


const issueRanked = async(req,res) =>{
    const {sortBy} = req.query;
    const { tags} = req.body;
    const validTags = ["경고", "뜨거움", "재미", "행운", "공지", "활동", "사랑"];
    try{
        const validTag = await Promise.all(
            tags.map((tag)=>{
                if (!validTags.includes(tag)) {
                  return null
                }
                return tag;
                
            })
        )

        const validedTag = validTag.filter((tag) => tag !== null)
        
        const post = await filterIssueByQuery(sortBy);
        if(!post){
            return res.status(200).send(authUtil.successTrue(statusCode.NO_CONTENT,responseMessage.NO_ISSUE))
        }
        const processPost = await filterIssueByTag(post,validTag);
        const result = await postData(processPost);
        if(!result){
            return res
              .status(200)
              .send(
                authUtil.successTrue(
                  statusCode.NO_CONTENT,
                  responseMessage.NO_ISSUE
                )
              );
        }

        return res.status(200).send(
            authUtil.successTrue(statusCode.OK, responseMessage.RANK_SORT_SUCCESS, result)
        );
    }catch(e){
        console.log(e)
        return res.status(500).send(
            authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SERVER_ERROR)
        );
    }
}

module.exports = issueRanked