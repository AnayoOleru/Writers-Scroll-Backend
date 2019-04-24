import models from '../models';
import serverError from '../helpers/server-error';

const { Notification } = models;

/**
 * @description Get a specific notification and update the is_seen column.
 * @param {*} req
 * @param {*} res
 * @returns {object} user provides their userId as params
 */
const updateIsSeenColumn = async (req, res) => {
  try {
    const { articleId } = req.params;
    const notification = await Notification.findOne({
      where: {
        user_id: req.user.userObj.id,
        article_id: articleId,
      },
    });

    if (!notification) {
      return res.status(200).json({
        message: 'No notification found for this article',
      });
    }
    notification.is_seen = true;
    const response = await notification.save();

    return res.status(200).json({
      userID: notification.user_id,
      articleID: notification.article_id,
      message: notification.message,
      status: response.is_seen,
    });
  } catch (err) {
    return serverError;
  }
};

/**
 * @description Get all Notification users have not read
 * @param {*} req
 * @param {*} res
 * @returns {object} All the notification belonging to the user
 */
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAndCountAll({
      where: {
        user_id: req.user.userObj.id,
        is_seen: false,
      },
    });
    if (!notifications || notifications.count === 0) {
      return res.status(200).json({
        message: "You don't have any notifications",
      });
    }
    return res.status(200).json({
      data: notifications,
    });
  } catch (err) {
    return serverError;
  }
};

const notificationController = {
  updateIsSeenColumn,
  getAllNotifications,
};

export default notificationController;
