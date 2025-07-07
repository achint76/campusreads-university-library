import nodemailer from 'nodemailer';
import config from '@/lib/config';

// Create a transporter using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.env.gmail.user,
      pass: config.env.gmail.appPassword, // Use App Password, not regular password
    },
  });
};

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: config.env.gmail.user, // Your Gmail address
      to: email,
      subject: subject,
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

// Alternative function for sending emails without using QStash (direct sending)
export const sendEmailDirect = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  return sendEmail({ email, subject, message });
}; 