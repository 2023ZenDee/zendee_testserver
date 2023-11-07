const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const util = require("../module/authUtil");
const resMessage = require("../module/responseMessage");
const statusCode = require("../module/statusCode");
const responseMessage = require("../module/responseMessage");
const authUtil = require("../module/authUtil");


require("dotenv").config();
const secret = process.env.SECRET_KEY;
exports.authenticateUser = async (req, res, next) => {
  const accessToken = req.headers.accesstoken; 
  if (!accessToken) {
    return res
      .status(400)
      .send(
        util.successTrue(statusCode.UNAUTHORIZED, resMessage.NO_ACCESS_TOKEN)
      );
  }

  try {
    const decoded = jwt.verify(accessToken, secret);

    const userId = decoded.id;
    const user = await prisma.user.findUnique({ where: { userId } });
  
    if (!user) {
      return res
        .status(401)
        .send(util.successTrue(statusCode.UNAUTHORIZED, resMessage.NO_USER));
    }
    
    req.user = user;

    next();
  } catch (err) {
    if ((err.name = "TokenExpiredError")) {
      return res
        .status(401)
        .json(
          util.successTrue(statusCode.UNAUTHORIZED, resMessage.TOKEN_EXPRIED)
        );
    }

    return res
      .status(401)
      .json(
        util.successTrue(
          statusCode.UNAUTHORIZED,
          resMessage.INVALID_ACCESS_TOKEN
        )
      );
  }
};

exports.mailAuthenticateUser = (req,res,next) =>{
  const mailToken = req.headers['mailtoken'];
  if(!mailToken){
    return res.status(401).send(
      util.successTrue(statusCode.UNAUTHORIZED, responseMessage.NO_MAILTOKEN)
    )    
  }

  try{
    const decoded = jwt.verify(mailToken, secret)
    req.email = decoded.id;
    req.authNum = decoded.authNum;
    next();
  }catch(err){
    console.log(err)
    if ((err.name = "TokenExpiredError")) {
      return res
        .status(401)
        .json(
          util.successTrue(statusCode.UNAUTHORIZED, resMessage.MAIL_TOKEN_EXPRIED)
        );
    }
    return res
      .status(401)
      .json(
        util.successTrue(
          statusCode.UNAUTHORIZED,
          resMessage.INVALID_MAIL_TOKEN
        )
      );

  }
}
