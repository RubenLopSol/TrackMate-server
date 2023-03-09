const transporter = require("../config/transporter.config")
const templates = require("../templates/template");

module.exports = function (email, subject, name) {
    return transporter.sendMail({
    from: `"iDeals " <${process.env.EMAIL_ADDRESS}>`,
    to: email,
    subject: subject,
    text: name, 
    html: templates.templateExample(name),
  })
}
