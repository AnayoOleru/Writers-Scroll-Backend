import sendEmail from '../config/email';
import models from '../models';
import template from './template';
import { pusher } from '../config/pusher';

const { User, Follower } = models;

const forgetPassword = (email, link) => {
  const subject = 'Password Reset';
  const message = template(
    `<p>You requested for a password reset</p> <p>follow this link to reset your password <a href=${link}>Reset my password</a></p><br><b>Please note that this link expires in 12hours and you can only use it once</b><p>If you didn't request for a password reset, ignore this email and nothing will happen</p>`
  );

  sendEmail(email, subject, message);
};

const passwordReset = email => {
  const subject = 'Password was changed';
  const message = template('<p>Your password was changed successfuly</p>');

  sendEmail(email, subject, message);
};

const signupEmail = (email, link) => {
  const titile = 'Welcome to Authors Haven';
  const body = `<p>click <a href=${link}>here</a> to confirm your email</p>`;
  sendEmail(email, titile, body);
};

/**
 *
 * @param {*} articleTitle
 * @param {*} authorId
 * @returns {*} sends an email to the author
 */
const sendEmailNotificationComment = async (articleTitle, authorId) => {
  const authorEmail = await User.findOne({
    where: { id: authorId },
    attributes: ['email'],
  });
  const templateSubject = 'New notification from Authors Haven';
  const templateEmail = authorEmail;
  const templateMessage = template(
    `<h1>Your article ${articleTitle} - has a new comment.</h1>`
  );
  sendEmail(templateEmail, templateSubject, templateMessage);
  // in-app notification
  pusher.trigger('channel', 'event', {
    message: `Your article ${articleTitle} has a new comment`,
  });
};

/**
 *
 * @param {*} articleTitle
 * @param {*} userId
 * @returns {*} sends an email to all followers
 */
const sendEmailNotificationArticle = async (articleTitle, userId) => {
  const followers = await Follower.findAll({
    where: { followee_id: userId },
    attributes: ['follower_id'],
    include: [
      {
        model: User,
        required: false,
        where: { id: Follower.followee_id, isNotified: true },
        attributes: ['email', 'first_name'],
      },
    ],
  });
  const templateSubject = 'New Notification on Authors Haven';
  const templateFollowersEmail = followers.User.email;
  const templateMessage = template(`<h1>${articleTitle}</h1>`);

  sendEmail(templateFollowersEmail, templateSubject, templateMessage);

  // in-app notification
  pusher.trigger('channel', 'event', {
    message: `${
      followers.User.first_name
    } has published a new article ${articleTitle}`,
  });
};

const Notifications = {
  forgetPassword,
  passwordReset,
  signupEmail,
  sendEmailNotificationComment,
  sendEmailNotificationArticle,
};

export default Notifications;
