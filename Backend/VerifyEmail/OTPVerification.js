import nodemailer from "nodemailer";
import "dotenv/config";

export const OTPVerificationMail = async (OTP, email) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  let mailDetails = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password reset OTP",
    html: `<p>Your OTP for your password reset:<b>${OTP}</b></p>`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });
};
