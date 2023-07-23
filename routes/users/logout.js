const authUtil = require("../../module/authUtil");
const responseMessage = require("../../module/responseMessage");
const statusCode = require("../../module/statusCode");

const logout = (req, res) => {
    
    const token = req.headers['accesstoken']; // 헤더 이름 소문자로 수정 (대문자 헤더를 소문자로 받아오는 것이 일반적)

    if (!token) {
        return res.status(400).send(
            authUtil.successTrue(statusCode.BAD_REQUEST, responseMessage.NO_ACCESS_TOKEN)
        );
    }
    res.status(200).send(
        authUtil.successTrue(statusCode.OK, responseMessage.LOGOUT_SUCCESS, token)
    );
};

module.exports = logout;
