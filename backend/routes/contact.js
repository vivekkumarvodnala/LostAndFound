import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import protectRoute from "../middlewares/authMiddleware.js";
dotenv.config();

const router = express.Router();

router.post("/",protectRoute, async (req, res) => {
  const { toEmail, subject, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: `"${req.user.name}" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject,
      text: message,
      replyTo:req.user.email,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
console.error("📛 Full error:", error);
res.status(500).json({ message: "Failed to send email.", error: error.message });

    res.status(500).json({ message: "Failed to send email." });
  }
});


export default router;
