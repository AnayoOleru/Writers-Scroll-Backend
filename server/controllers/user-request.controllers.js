import model from '../models';
import serverError from '../helpers/server-error';

const { User, Personal } = model;

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
        status: 400,
        errors: {
          body: ['You are not allowed to make a request'],
        },
      });
    }
    const requested = await Personal.create({
      user_id: userId,
      is_reviewer: false,
      is_reported: false,
    });
    return res.status(240).json({
      message: 'Successfully make a request',
      requested,
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
        status: 400,
        errors: {
          body: ['You are not allowed to delete a request'],
        },
      });
    }
    const requested = await Personal.destroy({
      where: {
        user_id: userId,
        is_reviewer: false,
        is_reported: false,
      },
    });
    if (requested) {
      return res.status(240).json({
        message: 'Successfully unchecked request',
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
