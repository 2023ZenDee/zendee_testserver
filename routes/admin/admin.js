const {PrismaClient} = require('@prisma/client');
const authUtil = require('../../module/authUtil');
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');
const prisma = new PrismaClient()
const admin = async(req, res) => {
    const reportedIssue = await prisma.postreporter.findMany()
    return res.status(200).send(
        authUtil.successTrue(statusCode.OK, responseMessage.REPORTED_ISSUE_SUCCESS, reportedIssue)
    )
}

module.exports = admin