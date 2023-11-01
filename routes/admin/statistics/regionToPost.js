const { PrismaClient} = require('@prisma/client');
const authUtil = require('../../../module/authUtil');
const statusCode = require('../../../module/statusCode');
const adminMessage = require('../../../module/adminMessage');
const { postCountDataByRegion } = require('../global/adminResponse');
const prisma = new PrismaClient();

const postByRegion = async(req,res)=>{
    try{
        const postCountsByRegion = await prisma.post.groupBy({
            by : ['address'],
            _count : {
                address : true
            }
        });
        const result = await postCountDataByRegion(postCountsByRegion);
        return res.status(200).send(
            authUtil.successTrue(statusCode.OK, adminMessage.REGION_BY_ISSUE_SUCCESS, result)
        )
    }catch(err){
        console.log(err);
        return res.status(500).send(
            authUtil.successTrue(statusCode.INTERNAL_SERVER_ERROR, adminMessage.REGION_BY_ISSUE_ERROR)
        )
    }
}

module.exports = postByRegion;