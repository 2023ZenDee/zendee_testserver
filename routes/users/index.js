const express = require("express");
const login = require("./login");
const register = require("./signUp");
const refreshToken = require("./refreshToken");
const { authenticateUser } = require("../../middleware/authenticate");
const getUser = require("./getuser");
const delUser = require("./deluser");
const myIssue = require("./myIssue");
const changePwd = require("./fixpwd");
const myCmts = require("./myComment");
const userLikes = require("./myLikeByPost");
const {upload} = require('../../middleware/multer')
const imageUploader = require("../../middleware/imageUploader");
const fixMyImg = require("./fixImg");
const fixMyNick = require("./fixNick");

const router = express.Router();

router.post("/register", register); //회원가입
router.post("/login", login); //로그인

router.post("/refreshToken" ,refreshToken); //refresh토큰 검증
router.get("/my", authenticateUser, getUser); //내 정보 불러오기

router.get("/my/issue", authenticateUser, myIssue); //내가 작성한 이슈
router.get("/my/comment", authenticateUser, myCmts); //내가 작성한 댓글
router.get("/my/like", authenticateUser, userLikes.userLikes); // 내가 좋아요 누른 이슈
router.get("/my/bad", authenticateUser, userLikes.userBads); //내가 싫어요 누른 이슈

router.patch("/my/nick/fix", authenticateUser,  fixMyNick);
router.patch("/my/img/fix", authenticateUser, imageUploader.single("img"), fixMyImg)
router.patch("/my/pwd/fix", authenticateUser, changePwd); //비밀번호 수정

router.delete("/fire", authenticateUser, delUser); //회원 탈퇴

module.exports = router;
