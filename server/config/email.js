import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (to, subject, message) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to,
      from: 'no-reply@authorshaven.com',
      subject,
      html: message,
    };
    await sgMail.send(msg);
  } catch (err) {
    return err;
  }
};

export default sendEmail;
