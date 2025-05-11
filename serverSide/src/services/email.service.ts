// src/services/EmailService.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_PORT === "465",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send email notification to admin about new contact form submission
 * @param contact - Contact form data
 */
export const sendContactNotification = async (contact: any) => {
  try {
    const mailOptions = {
      from: `"${process.env.SITE_NAME || "Financial Services"}" <${
        process.env.EMAIL_USER
      }>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form: ${contact.serviceOfInterest}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Company:</strong> ${
          contact.companyName || "Not provided"
        }</p>
        <p><strong>Service:</strong> ${contact.serviceOfInterest}</p>
        <p><strong>Message:</strong></p>
        <p>${contact.message}</p>
      `,
      replyTo: contact.email,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Contact notification email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

// Export email service
export default { sendContactNotification };
