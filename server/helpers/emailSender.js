import sendEmail from '../config/email';

const signupEmail = (email, link) => {
  const titile = 'Welcome to Authors Haven';
  const body = `<p>click <a href=${link}>here</a> to confirm your email</p>`;
  sendEmail(email, titile, body);
};

const emailSender = { signupEmail };

export default emailSender;
