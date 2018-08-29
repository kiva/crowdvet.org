const nodemailer = require("nodemailer");
const keys = require("../config/keys");

const defaultEmail = { from: keys.EMAIL };

const sendEmail = (emailData, smtpUrl = keys.SMTP_URL) => {
  const completeEmailData = Object.assign(defaultEmail, emailData);
  const transporter = nodemailer.createTransport(smtpUrl);
  return transporter
    .sendMail(completeEmailData)
    .then(info => console.log(`Message sent: ${info.response}`))
    .catch(err => console.log(`There was a problem sending email: ${err}`));
};

module.exports = { sendEmail };
