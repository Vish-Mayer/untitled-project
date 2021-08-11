import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendVerification = async (email, token) => {
  if (![email, token].every(Boolean)) {
    return;
  }

  let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const url = `http://localhost:5000/auth/confirmation/${token}`;

  let info = await transporter.sendMail({
    to: `${email}`,
    subject: "Please confirm your account",
    html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

sendVerification().catch(console.error);
export default sendVerification;
