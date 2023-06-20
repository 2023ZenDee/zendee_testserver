const { PrismaClient} = require('@prisma/client');
const { generateAccessToken} = require('../../security/jwt');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET_KEY;
const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken; // 쿠키에서 Refresh Token을 가져옴
    console.log(refreshToken);
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh Token이 없습니다.' });
    }
  
    try {
    const decoded = jwt.verify(refreshToken, secret); // Refresh Token 검증
  
      // Refresh Token의 payload에서 사용자 정보를 가져옴
      const userId = decoded.id;
      const user = await prisma.user.findUnique({ where: { userId } });
  
      if (!user) {
        return res.status(401).json({ message: '유효하지 않은 사용자입니다.' });
      }
  
      // 새로운 Access Token 생성
      const accessToken = generateAccessToken(user);
  
      res.status(200).json({ accessToken });
    } catch (err) {
        if(err.name=== 'TokenExpiredError'){
            console.log('토큰이 만료되었습니다.');
            return res.status(401).json({ message: '토큰이 만료되었습니다.' });
        }
        console.log(err);
      return res.status(401).json({ message: '유효하지 않은 Refresh Token입니다.' });
    }
  };

  module.exports = refreshToken;