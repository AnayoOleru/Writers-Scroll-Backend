import model from '../models';

const { Request } = model;

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
        body: ['You have already make a request'],
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
export default { verifyRequest, verifyUncheckRequest };
