const express = require("express");
const login = require("./login");
const register = require("./signUp");
const refreshToken = require("./refreshToken");
const logout = require("./logout");
const { authenticateUser } = require("../../middleware/authenticate");
const getUser = require("./getUser");
const delUser = require("./deluser");
const userFix = require("./userFix");
const myIssue = require("./myissue");
const changePwd = require("./fixpwd");
const myCmts = require("./comment");
const userLikes = require("./userLikes");

const router = express.Router();

router.post("/register", register); //회원가입
router.post("/login", login); //로그인

router.get("/refreshToken", authenticateUser ,refreshToken); //refresh토큰 검증
router.get("/", authenticateUser, getUser); //내 정보 불러오기

router.get("/myIssue", authenticateUser, myIssue); //내가 작성한 이슈
router.get("/comments", authenticateUser, myCmts); //내가 작성한 댓글
router.get("/likes", authenticateUser, userLikes.userLikes); // 내가 좋아요 누른 이슈
router.get("/bads", authenticateUser, userLikes.userBads); //내가 싫어요 누른 이슈

router.patch("/userFix", authenticateUser, userFix); //유저 정보 수정
router.patch("/fixpwd", authenticateUser, changePwd); //비밀번호 수정

router.delete("/fire", authenticateUser, delUser); //회원 탈퇴
router.delete("/logout", authenticateUser, logout); //로그아웃

module.exports = router;
