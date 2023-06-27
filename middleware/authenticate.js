const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


require('dotenv').config();
const secret = process.env.SECRET_KEY;
exports.authenticateUser = async (req, res, next) => {
    const accessToken = req.cookies.accessToken; // 쿠키에서 Access Token을 가져옴
  
    if (!accessToken) {
      return res.status(401).json({ message: 'Access Token이 없습니다.' });
    }
  
    try {
      const decoded = jwt.verify(accessToken, secret); // Access Token 검증
  
      // Access Token의 payload에서 사용자 정보를 가져옴
      const userId = decoded.id;
      const user = await prisma.user.findUnique({ where: { userId} });
  
      if (!user) {
        return res.status(401).json({ message: '유효하지 않은 사용자입니다.' });
      }
  

      // 요청 객체에 사용자 정보를 첨부하여 다음 미들웨어 또는 라우트 핸들러로 이동
      req.user = user;
      //console.log(req.user);
      next();
    } catch (err) {
      if(err.name = "TokenExpiredError"){
        return res.status(401).json({ message : 'AccessToken이 만료되었습니다. 다시 로그인 해주십시오.'})
      }
      return res.status(401).json({ message: '유효하지 않은 Access Token입니다.' });
    }
  };