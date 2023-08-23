const { PrismaClient } = require('@prisma/client');
const authUtil = require('../../../module/authUtil');
const statusCode = require('../../../module/statusCode');
const adminMessage = require('../../../module/adminMessage');
const prisma = new PrismaClient();

const getReportedUser = async(req,res) =>{
    try{
        const reportedUser = await prisma.userreporter.findMany();
        return res.status(200).send(
            authUtil.successTrue(statusCode.OK, adminMessage.REPORTED_USER_SUCCESS, reportedUser)     
        )
    }catch(err){
        console.log(err);
        return res.status(500).send(
            authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, adminMessage.REPORTED_USER_FALSE)
        )
    }
}

module.exports = getReportedUser