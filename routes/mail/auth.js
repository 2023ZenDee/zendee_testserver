const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let appDir = path.dirname(require.main.filename);

const sendMail = async (req, res) => {
  const { email } = req.body;
  let authNum = Math.random().toString(36).substr(2, 6);
  let emailTemplete;
  ejs.renderFile(
    appDir + "/template/authMail.ejs",
    { authCode: authNum },
    function (err, data) {
      if (err) {
        console.log(err);
      }
      emailTemplete = data;
    }
  );
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "ljm9894@dgsw.hs.kr",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });
  
  let mailOptions = await transporter.sendMail({
    from: `Zendee`,
    to: email,
    subject: "회원가입을 위한 인증번호를 입력해주세요.",
    html: emailTemplete,
  });
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    }
    console.log("Finish sending email : ", info.response);
    res.send(authNum);
    transporter.close();
  });
};
module.exports = sendMail;