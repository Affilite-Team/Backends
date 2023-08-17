const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (option) => {
  // create a transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const emailOptions = {
    from: "Affiliate support<support@affiliate.com>",
    to: option.email,
    subject: option.message,
    text: option.message,
  };

  transporter.sendMail(emailOptions, (err) => {
    console.log(err);
  });
};

module.exports = sendEmail;
