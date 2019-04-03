import models from '../models';
import sendEmail from '../config/email';
import template from './template';
import { pusher } from '../config/pusher';

const { User, Follower } = models;

const notification = {
  /**
   *
   * @param {*} articleTitle
   * @param {*} authorId
   * @returns {*} sends an email to the author
   */
  async sendEmailNotificationComment(articleTitle, authorId) {
    const email = await User.findOne({
      where: { id: authorId },
      attributes: ['email'],
    });
    const subject = 'New notification from Authors Haven';
    const authorEmail = email;
    const message = template(
      `<h1>Your article ${articleTitle} - has a new comment.</h1>`
    );
    sendEmail(authorEmail, subject, message);
    // in-app notification
    pusher.trigger('channel', 'event', {
      message: `Your article ${articleTitle} has a new comment`,
    });
  },

  /**
   *
   * @param {*} articleTitle
   * @param {*} userId
   * @returns {*} sends an email to all followers
   */
  async sendEmailNotificationArticle(articleTitle, userId) {
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
    const subject = 'New Notification on Authors Haven';
    const followersEmail = followers.User.email;
    const message = template(`<h1>${articleTitle}</h1>`);

    sendEmail(followersEmail, subject, message);

    // in-app notification
    pusher.trigger('channel', 'event', {
      message: `${
        followers.User.first_name
      } has published a new article ${articleTitle}`,
    });
  },
};

export default notification;
