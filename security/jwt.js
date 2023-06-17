const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET_KEY

module.exports = {
    createAccessToken : (id)=>{
        const accessToken = jwt.sign(
            {id :id},
            secret,
            {expiresIn : '5m'} 
        ) 
        return accessToken;
    },
    createRefreshToken :() =>{
        const refreshToken = jwt.sign(
            {},
            secret,
            {expiresIn : '7d'}
        )
        return refreshToken;
    }
}