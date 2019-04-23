import model from '../models';

const { Request, User } = model;

const verifyRequest = async (req, res, next) => {
  const userId = req.user.userObj.id;
  const findOneRequest = await Request.findOne({
    where: {
      user_id: userId,
      is_reviewer: false,
      is_reported: false,
    },
  });
  if (findOneRequest) {
    return res.status(403).json({
      status: 403,
      errors: {
        body: ['You have already made a request'],
      },
    });
  }
  next();
};
const verifyUncheckRequest = async (req, res, next) => {
  const userId = req.user.userObj.id;
  const findOneRequest = await Request.findOne({
    where: {
      user_id: userId,
      is_reviewer: false,
      is_reported: false,
    },
  });
  if (!findOneRequest) {
    return res.status(403).json({
      status: 403,
      errors: {
        body: ['You have already unchecked your request'],
      },
    });
  }
  next();
};
const checkIfRequestExists = async (req, res, next) => {
  const userId = req.user.userObj.id;
  const findRequest = await User.findOne({
    where: {
      id: userId,
      is_reviewer: false,
      is_reported: false,
      is_requested: true,
    },
  });
  if (findRequest) {
    return res.status(400).json({
      message: 'You cannot request to be a reviewer again',
    });
  }
  next();
};
export default { verifyRequest, verifyUncheckRequest, checkIfRequestExists };
