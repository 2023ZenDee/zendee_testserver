const jwt = require('jsonwebtoken');
const { tokenObject } = require('./login');
const { createAccessToken } = require('../../security/jwt');
require('dotenv').config();
const secret = process.env.SECRET_KEY;
const token = (req, res) =>{
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
     if(!refreshToken) return  res.status(400).json({message : "Refresh 토큰이 존재하지 않습니다."})
     if(!accessToken) return res.status(400).json({message : "Access Token이 존재하지 않습니다."})

     const isAccessTokenValidate = validateAccessToken(accessToken);
     const isRefreshTokenValidate = validateRefreshToken(refreshToken);
    
     if(!isRefreshTokenValidate){
        return res.status(419).json({ message : "RefreshToken 이 만료되었습니다."});
     }
     if(isAccessTokenValidate){
        const accessTokenId = tokenObject[refreshToken];
        if(!accessTokenId) return res.status(419).json({message : "Refresh Token의 정보가 서버에 존재하지 않습니다."});
        
        const newAccessToken = createAccessToken(accessTokenId);
        res.cookie('accessToken', newAccessToken);
        return res.json({ message : "Access Token을 새롭게 발급하였습니다."});

     }
     const { id }= getAccessTokenPayload(accessToken);
     if (id) {
        return res.json({ message: `${id}의 Payload를 가진 Token이 성공적으로 발급되었습니다.` });
      } else {
        return res.status(400).json({ message: "액세스 토큰의 페이로드를 가져올 수 없습니다." });
      }
}


const validateAccessToken = (accessToken)=>{
    try{
        jwt.verify(accessToken, secret);
        return true;
    }catch(err){
        return false;
    }
}

const validateRefreshToken = (refreshToken) =>{
    try{
        jwt.verify(refreshToken, secret);
        return true;
    }catch(error){
        return false;
    }
}

const getAccessTokenPayload = (accessToken) =>{
    try{
        const payload = jwt.verify(accessToken, secret);
        return payload;
    }catch(err){
        
        console.log(err);
        return err;
    }
}

module.exports = token;