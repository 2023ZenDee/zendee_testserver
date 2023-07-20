const logout = (req,res) =>{
    try{
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

    res.status(200).json({
        message : "로그아웃 되었습니다."
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message : "로그아웃 에러"
        })
    }
    
} 

module.exports = logout;