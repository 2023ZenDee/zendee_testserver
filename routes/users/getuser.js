const authUtil = require('../../module/authUtil');
const statusCode = require('../../module/statusCode');
const responseMessage = require('../../module/responseMessage');

const getUser = async(req, res) => {
    try{
        const user = await req.user;
        const userData = {
            nick : user.nick,
            image : user.image,
            email : user.email,
        }
        return res.status(200).send(
            authUtil.successTrue(statusCode.OK, responseMessage.SUCCESS_SELECT_USER, userData)
        )
    }catch(err){
        console.error(err);
        return res.status(500).send(
            authUtil.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FALSE_SELECT_USER)
        )
    }
}

module.exports = getUser;