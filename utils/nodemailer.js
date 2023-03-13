const transporter = require("../config/transporter.config")
const templates = require("../templates/template");

module.exports = function (email, subject, userName) {
    return transporter.sendMail({
    from: `"iDeals " <${process.env.EMAIL_ADDRESS}>`,
    to: email,
    subject: subject,
    text: userName, 
    html: templates.templateExample(userName),
  })
}
