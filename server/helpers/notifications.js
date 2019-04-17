import sendEmail from '../config/email';
import models from '../models';
import template from './template';
import { pusher } from '../config/pusher';

const { User, Follower } = models;

const forgetPassword = (email, link) => {
  const subject = 'Password Reset';
  const message = template(
    subject,
    `<p>You requested for a password reset</p> <p>follow this link to reset your password <a href=${link}>Reset my password</a></p><br><b>Please note that this link expires in 12hours and you can only use it once</b><p>If you didn't request for a password reset, ignore this email and nothing will happen</p>`,
    email
  );
  sendEmail(email, subject, message);
};

const passwordReset = email => {
  const subject = 'Password was changed';
  const message = template(
    subject,
    '<p>Your password was changed successfuly</p>',
    email
  );
  sendEmail(email, subject, message);
};

/**
 *
 * @param {*} email
 * @param {*} link
 * @param {*} name
 * @returns {*} sends an email to a new user
 */
const signupEmail = (email, link, name) => {
  const title = 'Welcome to Authors Haven';
  const body = `<p>Dear ${name},</p>
  <p>We are thrilled to have you.</p>
  <p>At Author’s Haven, we know how much you love to share your thought as an author 
      That's is why we are here to help you focus on things that matter.</p>
      <a href="${link}" class="button">Confirm email</a>`;
  const message = template(title, body, email);
  sendEmail(email, title, message);
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
    attributes: ['email', 'first_name'],
  });

  const templateSubject = 'New notification from Authors Haven';
  const templateEmail = authorEmail.email;
  const templateMessage = `<p> ${
    authorEmail.first_name
  }, your article " <i>${articleTitle}</i> " has a new comment.</p>`;

  const message = template(templateSubject, templateMessage, templateEmail);
  sendEmail(templateEmail, templateSubject, message);
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
        as: 'follower',
        where: { is_notified: true },
        attributes: ['email', 'first_name'],
      },
      {
        model: User,
        as: 'followee',
        attributes: ['first_name'],
      },
    ],
  });

  followers.forEach(user => {
    const templateSubject = 'New Notification on Authors Haven';
    const templateFollowersEmail = user.follower.email;
    const templateMessage = `
      <p>${
        user.followee.first_name
      } just published a new article <br> <b>${articleTitle}</b></p>`;

    const message = template(
      templateSubject,
      templateMessage,
      templateFollowersEmail
    );
    sendEmail(templateFollowersEmail, templateSubject, message);

    // in-app notification
    pusher.trigger('channel', 'event', {
      message: `${
        user.follower.first_name
      } has published a new article ${articleTitle}`,
    });
  });
};

/**
 *
 * @param {*} reportedUserEmail
 * @param {*} body
 * @returns {*} sends an email to a new user
 */
const reportedArticleNotification = (reportedUserEmail, body) => {
  const title = 'Reported Article';
  const message = template(title, body, reportedUserEmail);
  sendEmail(reportedUserEmail, title, message);
};

const Notifications = {
  forgetPassword,
  passwordReset,
  signupEmail,
  sendEmailNotificationComment,
  sendEmailNotificationArticle,
  reportedArticleNotification,
};

export default Notifications;
