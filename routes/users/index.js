const express = require("express");
const login = require("./login");
const register = require("./signUp");
const refreshToken = require("./refreshToken");
const logout = require("./logout");
const { authenticateUser } = require("../../middleware/authenticate");
const getUser = require("./getuser");
const delUser = require("./deluser");
const userFix = require("./userFix");
const myIssue = require("./myissue");
const changePwd = require("./fixpwd");
const myCmts = require("./comment");
const userLikes = require("./userLikes");
const {upload} = require('../../middleware/multer')

const router = express.Router();

router.post("/register", register); //회원가입
router.post("/login", login); //로그인

router.post("/refreshToken" ,refreshToken); //refresh토큰 검증
router.get("/my", authenticateUser, getUser); //내 정보 불러오기

router.get("/my/issue", authenticateUser, myIssue); //내가 작성한 이슈
router.get("/my/comment", authenticateUser, myCmts); //내가 작성한 댓글
router.get("/my/like", authenticateUser, userLikes.userLikes); // 내가 좋아요 누른 이슈
router.get("/my/bad", authenticateUser, userLikes.userBads); //내가 싫어요 누른 이슈

router.patch("/my/fix", authenticateUser,upload.single('img'),userFix); //유저 정보 수정
router.patch("/my/pwd/fix", authenticateUser, changePwd); //비밀번호 수정

router.delete("/fire", authenticateUser, delUser); //회원 탈퇴
router.delete("/logout", authenticateUser, logout); //로그아웃

module.exports = router;
