const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const authUtil = require("../../module/authUtil");
const statusCode = require("../../module/statusCode");
const responseMessage = require("../../module/responseMessage");
const { generateMailToken } = require("../../util/jwt");
const mailCheck = require("./mailCheck");

let appDir = path.dirname(require.main.filename);

const sendMail = async (req, res) => {
  const { email } = req.body;
  let authNum = Math.random().toString(36).substr(2, 6);
  let emailTemplete;
  ejs.renderFile(
    appDir + "/template/authMail.ejs",
    { authCode: authNum, email: email },
    function (err, data) {
      if (err) {
        console.log(err);
      }
      emailTemplete = data;
    }
  );
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  let mailOptions = await transporter.sendMail({
    from: 'ljm9894@dgsw.hs.kr',
    to: email,
    subject: `[${authNum}]회원가입을 위한 인증번호를 입력해주세요.`,
    html: emailTemplete,
  });
  const mailToken = generateMailToken(email);
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      res.status(200).send(
        authUtil.successFalse(statusCode.BAD_REQUEST,responseMessage.MAIL_NOT_SENT)
      )
    }
    res.status(200).send(
      authUtil.successTrue(statusCode.OK, responseMessage.MAIL_SENT, mailToken)
    )
    transporter.close();
  });
};
module.exports = sendMail;
