import model from '../models';
import serverError from '../helpers/server-error';

const { User, Request } = model;

const request = async (req, res) => {
  const userId = req.user.userObj.id;
  try {
    const findUser = await User.findOne({
      where: {
        id: userId,
        is_reviewer: false,
        is_reported: false,
      },
    });
    if (!findUser) {
      return res.status(400).json({
        errors: {
          body: ['You are not allowed to make a request'],
        },
      });
    }
    await Request.create({
      user_id: userId,
      is_reviewer: false,
      is_reported: false,
    });
    await User.update({ is_requested: true }, { where: { id: userId } });
    return res.status(201).json({
      message: 'You have successfully made a request',
    });
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};

const removeRequest = async (req, res) => {
  const userId = req.user.userObj.id;
  try {
    const findUser = await User.findOne({
      where: {
        id: userId,
        is_reviewer: false,
        is_reported: false,
      },
    });
    if (!findUser) {
      return res.status(400).json({
        errors: {
          body: ['You are not allowed to delete a request'],
        },
      });
    }
    const requested = await Request.destroy({
      where: {
        user_id: userId,
        is_reviewer: false,
        is_reported: false,
      },
    });
    if (requested) {
      return res.status(200).json({
        message: 'You have successfully removed your reviewer request',
      });
    }
  } catch (error) {
    return res.status(500).json({
      errors: serverError(),
    });
  }
};
const requestController = { request, removeRequest };
export default requestController;
