const { PrismaClient} = require('@prisma/client');
const authUtil = require('../../module/authUtil');
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const prisma = new PrismaClient();
const {validationIssue} = require('../../validation/issuecheck');

const issueReport = async(req,res) =>{
    const posterIdx = parseInt(req.params.idx);
    const { content } = req.body;
    try{
        if(validationIssue(posterIdx)){
            return res.status(404).send(
                authUtil.successTrue(statusCode.NOT_FOUND, responseMessage.NOT_FOUND_ISSUE)
            )
        }
        const reported = await prisma.postreporter.create({
            data : {
                portReporterContent : content,
                post : { connect : {
                    postIdx : posterIdx
                }},
                user : { connect : {
                    userIdx : req.user.userIdx
                }},
                postReported_at : new Date(),

            }
        });
        return res.status(200).send(
            authUtil.successTrue(statusCode.CREATED, responseMessage.ISSUE_REPORT_SUCCESS, reported)
        )
    }catch(err){
        console.log(err);
        return res.status(500).send(
            authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.ISSUE_REPORT_ERROR)
        )
    }
}

module.exports = issueReport