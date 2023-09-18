module.exports = {
  SIGNUP_SUCCESS: "회원가입이 성공적으로 처리되었습니다.",
  DUPLICATION_USERID : "중복된 회원 아이디 입니다.",
  DUPLICATION_EMAIL : "중복된 회원 이메일 입니다.",
  EMAIL_USERID_DUPLICATION : "회원 아이디, 이메일이 중복되었습니다.",
  SIGNUP_SERVER_ERROR: "회원가입 서버 오류",

  LOGIN_SUCCESS: "로그인이 성공적으로 처리되었습니다.",
  LOGIN_FAIL: "유효하지 않은 사용자 아이디 또는 비밀번호가 맞지 않습니다.",
  LOGIN_SERVER_ERROR: "로그인 서버 오류",

  NO_ACCESS_TOKEN: "AccessToken이 없습니다.",
  TOKEN_EXPRIED: "AccessToken이 만료되었습니다. 다시 로그인 해주십시오.",
  INVALID_ACCESS_TOKEN: "유효하지 않은 Access Token입니다.",
  NO_USER: "유효하지 않은 사용자 입니다.",

  NO_REFRESH_TOKEN: "RefreshToken이 없습니다.",
  REFRESH_TOKEN_EXPIRED: "RefreshToken이 만료되었습니다.",
  INVALID_REFRESH_TOKEN: "유효하지 않은 Refresh Token입니다.",

  COMMENT_GET_SERVER_ERROR: "댓글 가져오기 실패",
  COMMENT_CREATED_SERVER_ERROR: "댓글 업데이트 실패",
  COMMENT_CREATED: "댓글이 성공적으로 업데이트 되었습니다.",
  COMMENT_GET_SUCCESS: "댓글을 성공적으로 가져왔습니다",
  COMMENT_NO_CONTENT: "댓글이 없습니다.",

  COMMENT_NOT_AUTHOR: "자신의 댓글만 삭제할 수 있습니다",
  COMMENT_UPDATE_SUCCESS: "댓글이 수정되었습니다.",
  COMMENT_UPDATE_FALSE: "댓글 수정 실패",

  COMMENT_ONLY_AUTHOR: "자신이 쓴 댓글만 삭제할 수 있습니다",
  COMMENT_DELETE: "댓글이 삭제되었습니다.",
  COMMENT_DELETE_SERVER_ERROR: "댓글 삭제 실패",

  ISSUE_ONLY_AUTHOR: "자신의 이슈만 수정할 수 있습니다.",
  ISSUE_FIX_SERVER_ERROR: "이슈 수정 실패",
  ISSUE_FIX_SUCCESS: "이슈가 수정되었습니다.",

  ISSUE_DELETE_SUCCESS: "이슈가 삭제되었습니다.",
  ISSUE_DELETE_FALSE: "이슈 삭제 실패하였습니다.",

  MY_COMMENTS_GET_SUCCESS: "내가 작성한 댓글을 성공적으로 불러왔습니다.",
  EMPRY_MY_COMMENT: "아직 내가 작성한 댓글이 없습니다.",
  MY_COMMENTS_GET_FALSE: "내가 작성한 댓글을 불러오지 못했습니다",

  LOGOUT_USER: "이미 로그아웃된 사용자 입니다",
  LOGOUT_SUCCESS: "로그아웃 되었습니다.",

  LIKE_ERROR: "좋아요와 싫어요 오류 발생",

  MY_LIKE_ISSUE: "내가 누른 좋아요 불러오기 성공",
  MY_LIKE_EMPTY: "아직 내가 누른 좋아요가 없습니다!",
  MY_BAD_ISSUE: "내가 누른 싫어요 불러오기 성공",
  MY_BAD_EMPTY: "아직 내가 누른 싫어요가 없습니다.",

  MY_LIKE_SERVER_ERROR: "나의 좋아요 서버 에러",
  MY_BAD_SERVER_ERROR: "나의 싫어요 서버 에러",

  ISSUE_REPORT_SUCCESS: "이슈가 신고되었습니다.",
  ISSUE_REPORT_ERROR: "이슈 신고가 되지 않았습니다.",

  COMMENT_REPORT_ERROR: "댓글 신고가 되지 않았습니다.",

  NOT_FOUND_ISSUE: "존재하지 않는 이슈입니다.",
  SUCCESS_FOUND_ISSUE: "이슈 조회 성공!",
  FALSE_FOUND_ISSUE: "이슈 조회 실패 :(",
  MY_AROUND_NOTFOUND_ISSUE: "근처에 이슈가 없습니다.",

  EXPIRED_POST: "만료된 이슈 입니다.",
  INVALID_TAG: "유효하지 않은 태그 입니다.",

  SUCCESS_CREATED_ISSUE: "이슈가 성공적으로 업데이트 되었습니다.",
  FALSE_CREATED_ISSUE: "이슈 생성 실패하였습니다.",

  SUCCESS_EMAIL_CHECK: "이메일 인증에 성공하였습니다.",
  FALSE_EMAIL_CHECK: "인증번호가 맞지 않습니다. 다시 확인하여 주십시오.",

  SUCCESS_PASSWORD_CHANGED: "비밀번호가 변경되었습니다.",
  FALSE_PASSWORD_CHANGED: "비밀번호 변경에 실패하였습니다.",

  SUCCESS_SELECT_USER: "내 정보 조회 성공하였습니다.",

  NOT_FOUND_USER: "존재하지 않는 유저 입니다.",
  ONLY_HOST_DELETED: "자신의 계정만 삭제할 수 있습니다.",
  SUCCESS_USER_DELETED: "계정이 탈퇴되었습니다.",
  FALSE_USER_DELETED: "계정 탈퇴에 실패하였습니다.",

  ALREADY_HAVE_ID: "존재하는 아이디 입니다.",
  OK_USE_ID: "사용 가능한 아이디 입니다.",

  EMPTY_MY_ISSUE: "아직 내가 올린 이슈가 없습니다.",
  SUCCESS_GET_MY_ISSUE: "내가 올린 이슈 조회 성공",
  FALSE_GET_MY_ISSUE: "내가 올린 이슈 조회 실패",

  SUCCESS_USER_FIX: "유저 정보가 수정되었습니다.",
  FALSE_USER_FIX: "유저 정보 수정을 실패하였습니다.",

  SUCCESS_SORT :"정렬되었습니다.",
  FALSE_SORT : "정렬에 실패하였습니다.",

  UNAUTHORIZED_THIS_USER : "접근 권한이 없습니다.",

  
  MAIL_SENT : "인증 이메일을 보냈습니다",
  MAIL_NOT_SENT : "인증 메일을 보내는데 실패하였습니다.",

  USER_REPORTED_SUCCESS : "신고 완료되었습니다.",
  USER_REPORTED_FALSE : "신고 오류",

  ACCESS_TOKEN : "AccessToken이 발급되었습니다.",

  NO_ACCESS_RIGHT : "인증이 되지 않은 사용자 입니다.",
  NO_MAILTOKEN : "메일 인증 토큰이 없습니다.",
  MAIL_TOKEN_EXPRIED: "MailToken이 만료되었습니다. 다시 인증 해주십시오.",
  INVALID_MAIL_TOKEN: "유효하지 않은 MailToken입니다.",

  EMAIL_AUTH_FALSE : "이메일 인증 실패",

  ADDRESS_GET_FALSE : "주소 GET 실패",

};
