import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

const sendEmail = async (to, subject, message) => {
  // use nodemailler during testing and development, sendgrid in production
  if (env === 'test' || env === 'development') {
    const account = await nodemailer.createTestAccount();
    const transporter = await nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: account.user, pass: account.pass },
    });
    const mailOptions = {
      from: 'no-reply@authorshaven.com',
      to,
      subject,
      html: message,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } else {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to,
      from: 'no-reply@authorshaven.com',
      subject,
      html: message,
    };
    await sgMail.send(msg);
  }
};

export default sendEmail;
