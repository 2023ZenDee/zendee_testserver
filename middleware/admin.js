const authUtil = require("../module/authUtil")
const responseMessage = require("../module/responseMessage")
const statusCode = require("../module/statusCode")

exports.authenticateAdmin = (req, res, next)=>{
    if(req.user.role !== 'ADMIN'){
        return res.status(200).send(
            authUtil.successTrue(statusCode.UNAUTHORIZED, responseMessage.UNAUTHORIZED_THIS_USER)
        );
    }
    next();
}