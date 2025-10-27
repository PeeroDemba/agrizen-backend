import nodemailer from "nodemailer";
import "dotenv/config";

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      //@ts-ignore
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: process.env.SMTP_SECURE === "true" ? true : false,
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    // console.log("Email sent", res);
  } catch (e) {
    // console.log("Failed to send email", e);
  }
}
