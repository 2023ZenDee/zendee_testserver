const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;
const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    {
      id: user,
    },
    secret, // Access Token에 사용할 비밀 키
    { expiresIn: process.env.TOKEN_EXPIRED } // Access Token의 유효 기간 설정
  );
  return accessToken;
};

// Refresh Token 생성 함수
const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    {
      id: user,
    },
    secret, // Refresh Token에 사용할 비밀 키
    { expiresIn: process.env.REFRESHTOKEN_EXPIRED }
  );
  return refreshToken;
};


const generateMailToken = (email, num) =>{
  const mailToken = jwt.sign(
    {
      id : email,
      authNum : num
    },
    secret,
    {
      expiresIn : "5m"
    }
  );
  return mailToken
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateMailToken
};
